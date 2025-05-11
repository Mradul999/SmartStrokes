import { sendContactEmail } from "../utils/sendContactEmail.js";

export const submitContactForm = async (req, res) => {
  try {
    console.log("Contact form submission received:", req.body);
    
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log("Missing required fields:", { name, email, subject, message });
      return res.status(400).json({ 
        success: false, 
        message: "All fields are required (name, email, subject, message)" 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Invalid email format:", email);
      return res.status(400).json({ 
        success: false, 
        message: "Please provide a valid email address" 
      });
    }
    
    console.log("Attempting to send email with details:", {
      to: "prashant047alg@gmail.com",
      from: process.env.EMAIL,
      subject: `Contact Form: ${subject}`
    });
    
    // Send contact email
    await sendContactEmail(name, email, subject, message);
    
    console.log("Email sent successfully");
    
    // Return success response
    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully. We'll get back to you soon!"
    });
    
  } catch (error) {
    console.error("Contact form error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      code: error.code
    });
    
    return res.status(500).json({
      success: false,
      message: "Sorry, there was an error sending your message. Please try again later."
    });
  }
}; 