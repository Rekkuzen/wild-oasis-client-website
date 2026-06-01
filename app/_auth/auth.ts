import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import supabase from "../_lib/supabase-service";

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const { data: existingUser, error: fetchError } = await supabase
          .from("guests")
          .select("id")
          .eq("emailAddress", user.email)
          .maybeSingle();

        if (fetchError) console.error("Fetch Error", fetchError);

        if (!existingUser) {
          const { error: insertError } = await supabase
            .from("guests")
            .insert([{ fullName: user.name, emailAddress: user.email }]);
          if (insertError) console.error("Fetch Error", insertError);
        }

        return true;
      } catch (err) {
        console.error("signin callback failed:", err);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const { data } = await supabase
          .from("guests")
          .select("id")
          .eq("emailAddress", user.email)
          .maybeSingle();

        token.guestId = data?.id ?? null;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.guestId = token.guestId;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

//signIn and signOut can only work in server, so instead of client component use server actions.
export const { auth, signIn, signOut, handlers } = NextAuth(authConfig);
