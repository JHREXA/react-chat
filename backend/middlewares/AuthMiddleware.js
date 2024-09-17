import jwt from "jsonwebtoken";

export const verifyToken = (request, response, next) => {
  console.log("Cookies in request:", request.cookies);

  const token = request.cookies.jwt;

  console.log("Token in request:", token);

  if (!token) {
    console.log("No token found. User not authenticated.");
    return response.status(401).send("You are not authenticated!");
  }

  jwt.verify(token, process.env.JWT_KEY, (error, payload) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        console.log("Token has expired.");
        return response
          .status(401)
          .send("Token has expired. Please log in again.");
      } else {
        console.log("Token verification error:", error.message);
        return response.status(403).send("The token is not valid.");
      }
    }

    console.log("Token verified successfully. Payload:", payload);
    request.userId = payload.userId;
    next();
  });
};
