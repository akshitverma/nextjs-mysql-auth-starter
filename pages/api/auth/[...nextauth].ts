import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";


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
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        console.log(user);
        console.log(account);
        console.log(profile);
        console.log(credentials);
        console.log(email);

        if (account) {
            const res = await fetch("https://ankitkf.ngrok.io/auth/register-by-access-token/social/google-oauth2/", {
            method: "POST",
            body: JSON.stringify({"access_token": account.access_token}),
            headers: {
                'Content-Type': 'application/json',
              }
          });

          const data = await res.json();
          // session.token = user.token;
          //localStorage.setItem('accessToken', data.token);
          console.log(data);
      }
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  }
});
