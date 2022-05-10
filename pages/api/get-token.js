import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

export default async (req, res) => {
  const token = await getToken({ req, secret });
  if (token) {
    // Signed in
    res.status(200).json({
      status: "Token fetch successful!",
      token,
    });
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
