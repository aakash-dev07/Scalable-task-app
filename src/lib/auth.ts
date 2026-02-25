import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// Token बनाने के लिए (Login के समय)
export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" }); // 1 दिन के लिए वैलिड
};

// Token चेक करने के लिए (Protected Routes के लिए)
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};