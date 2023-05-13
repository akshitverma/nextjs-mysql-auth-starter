// These styles apply to every route in the application

'use client';
import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import Toaster from "@/components/toaster";
import AuthStatus from "@/components/auth-status";
import { SessionProvider } from "next-auth/react"

const inter = Inter({
  variable: "--font-inter",
});

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   //const AuthStatusDiv = await AuthStatus();
//   return (
//     <SessionProvider>
//     <html lang="en">
//       <body className={inter.variable}>
        
//         <Toaster />
//         {/* {AuthStatusDiv} */}
//         {/* {children} */}
        
//       </body>
//     </html>
//     </SessionProvider>
//   );
// }

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <SessionProvider>
          {/* <App children={children}/>   */}
          <html lang="en">
       <body className={inter.variable}>
        
         <Toaster />
         {/* {AuthStatusDiv} */}
         {children}
        
     </body>
          </html>        
    </SessionProvider>
  )
}