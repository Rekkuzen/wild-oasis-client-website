import "next-auth";
import "next-auth/jwt";

// We add guestId here in session on nextAuth type so that we can prevent errors
declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      guestId?: string | null;
    };
  }
}

// We add guestId here in jwt on nextAuth type so that we can prevent errors
declare module "next-auth/jwt" {
  interface JWT {
    guestId?: string | null;
  }
}
