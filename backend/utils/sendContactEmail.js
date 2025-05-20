import transporter from "./nodemailertransporter.js";
import dotenv from "dotenv";
dotenv.config();

export const sendContactEmail = async (name, email, subject, message) => {
  try {
    const mailOptions = {
      from: `"Contact Form - SmartStrokes" <${process.env.EMAIL}>`,
      to: "prashant047alg@gmail.com",
      subject: `Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #6d28d9; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px; margin-top: 0;">New Contact Form Submission</h2>
          
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 15px 0;">
            <h3 style="margin-top: 0; color: #4b5563;">Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px; text-align: center;">
            This message was sent from the SmartStrokes contact form.
          </p>
        </div>
      `,
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    return info;
  } catch (error) {
    throw error;
  }
};