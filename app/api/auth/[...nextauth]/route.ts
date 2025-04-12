/* eslint-disable @typescript-eslint/no-explicit-any */
// import { api } from "@/lib/api-client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    // 🟢 Custom backend login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("login credentials", credentials);

          // const res: LoginResponse = await api.get(
          //   `/login.json`,
          //   {},
          //   {
          //     headers: {
          //       Authorization: `Basic ${btoa(
          //         `${credentials?.email}:${credentials?.password}`
          //       )}`,
          //     },
          //   }
          // );

          // console.log("res", res);

          // // Handle original response structure
          // const userInfo = res.users[0];
          // const section = res.userSessions[0];
          // const emailInfo = res.emailAddresses[0];

          // console.log({
          //   id: userInfo.id,
          //   name: userInfo.nickName,
          //   email: emailInfo.address,
          //   section,
          // });

          // return {
          //   id: userInfo.id,
          //   name: userInfo.nickName,
          //   email: emailInfo.address,
          //   section,
          // };

          return {
            id: "1",
            name: "John Doe",
            email: "john.doe@example.com",
            section: {
              token: "1234567890",
              id: "1",
            },
          };
        } catch (error: any) {
          console.error("Login error:", error);
          throw new Error(error?.message || "Authentication failed");
        }
      },
    }),

    // 🟢 Google OAuth login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.section = user.section;
      }

      if (account?.provider === "google") {
        token.googleAccessToken = account.access_token;
      }

      return token;
    },

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.section = token.section;
      session.googleAccessToken = token.googleAccessToken;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
});

export { handler as GET, handler as POST };
