"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Navigation = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className={`transition-colors hover:text-accent-400 ${pathname === "/cabins" ? "text-accent-400" : ""}`}
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`transition-colors hover:text-accent-400 ${pathname === "/about" ? "text-accent-400" : ""}`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className={`flex items-center gap-4 transition-colors hover:text-accent-400 ${pathname === "/account" ? "text-accent-400" : ""}`}
          >
            {session?.user?.image && session?.user?.name ? (
              <>
                <Image
                  className="rounded-full"
                  src={session.user.image}
                  height={38}
                  width={38}
                  alt={session.user.name}
                  referrerPolicy="no-referrer"
                />
                {session.user.name}
              </>
            ) : (
              "Guest Area"
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
