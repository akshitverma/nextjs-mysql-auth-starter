import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.body;
  // const exists = await prisma.user.findUnique({
  //   where: {
  //     email,
  //   },
  // });

  const authTokenCall = await fetch(process.env.BASE_URL + "/auth/register-by-access-token/social/google-oauth2/", {
    method: "POST",
    body: JSON.stringify({"access_token": token}),
    headers: {
        'Content-Type': 'application/json',
      }
  });

  const data = await authTokenCall.json();
  console.log(data);
  const accessToken = data.token;


  res.setHeader('Set-Cookie', `sessionToken=${accessToken}; Path=/; HttpOnly`);
  res.status(200).json(accessToken);
  // if (exists) {
  //   res.status(400).send("User already exists");
  // } else {
  //   const user = await prisma.user.create({
  //     data: {
  //       email,
  //       password: await hash(password, 10),
  //     },
  //   });
    
  // }
}
