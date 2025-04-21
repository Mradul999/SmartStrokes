import transporter from "./nodemailertransporter.js";
import dotenv from "dotenv";
dotenv.config();

export const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"Verify your Email" <${process.env.EMAIL}> `,
    to: email,
    subject: "EMAIL verification OTP",
    html: `<h3>Your OTP is: <b>${otp}</b></h3>`,
  });
};
