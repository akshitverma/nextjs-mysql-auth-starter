import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from 'axios';
import { type DefaultSession } from 'next-auth'

interface SessionExtension extends DefaultSession {
  accessToken: string;
  apiToken: string;
  refreshToken: string;
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: '379196351392-ch6m4kun04ff4qc4muj26jlu4f9bcn34.apps.googleusercontent.com',
      clientSecret: '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',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        //token.idToken = user.idToken;
        if (account) {
          const response = await axios.post(process.env.BASE_URL + "/auth/register-by-access-token/social/google-oauth2/", {
                access_token: account.access_token,
          });
          console.log("ttt");
          console.log(response.data);
          if (response.data) {
            token.accessToken = response.data.token;
            //user.name = response.data.token;
          }
        }
      }
      return token;
    },
    async session({ session, user, token }) {
      session.user = {
        name: session.user?.name,
        email: session.user?.email,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
  // callbacks: {
  //   async session(session, token) {
  //     session.accessToken = token.accessToken
  //     session.user.accessToken = token.accessToken
  //     return session
  // },
  //   async jwt(token, user) {
  //     if (user) {
  //         token = { accessToken: user.accessToken }
  //     }
  
  //     return token
  // },
  //   async signIn({ user, account, profile, email, credentials }) {
  //     //const isAllowedToSignIn = true
  //     //if (isAllowedToSignIn) {
  //       console.log(user);
  //       console.log(account);
  //       console.log(profile);
  //       console.log(credentials);
  //       console.log(email);

  //       if (account) {
  //         const response = await axios.post(process.env.BASE_URL + "/auth/register-by-access-token/social/google-oauth2/", {
  //           access_token: account.access_token,
  //         });

  //         console.log("ttt");
  //         console.log(response);

  //       if (response.data) {
  //             user.accessToken = response.data.token;
  //               return true;
  //             } else {
  //               return false;
  //             }

  //         // fetch("/api/auth/callback/google", {
  //         //   method: "POST",
  //         //   headers: {
  //         //     "Content-Type": "application/json",
  //         //   },
  //         //   body: JSON.stringify({
  //         //     access_token: "dasdasdasda"
  //         //   }),
  //         // }).then(async (res) => {
  //         //   //setLoading(false);
  //         //   if (res.status === 200) {
  //         //     //toast.success("Account created! Redirecting to login...");
  //         //     setTimeout(() => {
  //         //       //router.push("/logimpn");
  //         //     }, 2000);
  //         //   } else {
  //         //     //toast.error(await res.text());
  //         //   }
  //         // });
  //         //   const res = await fetch("/api/auth/callback/google", {
  //         //   method: "POST",
  //         //   body: JSON.stringify({"access_token": account.access_token})
  //         //   // headers: {
  //         //   //     'Content-Type': 'application/json',
  //         //   //   }
  //         // });

  //         // const data = await res.json();
  //         // //res.setHeader('Set-Cookie', `sessionToken=${response.data.token}`);
  //         // // session.token = user.token;
  //         // //localStorage.setItem('accessToken', data.token);
  //         // console.log(data);
  //     } 
  //     else {
  //       // Return false to display a default error message
  //       return false
  //       // Or you can return a URL to redirect to:
  //       // return '/unauthorized'
  //     }
  //   },
  // }
});
