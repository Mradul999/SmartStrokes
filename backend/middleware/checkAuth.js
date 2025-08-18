import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const checkAuth = async (req, res, next) => {
  try {
    console.log("checkauth called and checking the token in the cookies");
    const token = req.cookies["access-token"];
    console.log(token);

    if (!token)
      return res.status(401).json({ message: "user not authenticated" });

    const decoded = jwt.verify(token, process.env.secret);

    req.user = decoded;
    console.log(req.user);
    next();
  } catch (error) {
    return res.status(500).json({ message: "token not valid " });
  }
};
