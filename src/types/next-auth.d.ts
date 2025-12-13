import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone: string;
      gender: "male" | "female" | "other" | "";
      dob: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    phone: string;
    gender: "male" | "female" | "other" | "";
    dob: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone: string;
    gender: "male" | "female" | "other" | "";
    dob: string;
  }
}
