import Navigation from "./Navigation";
import Logo from "./Logo";
import { SessionProvider } from "next-auth/react";

const Header = () => {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Logo />
        <SessionProvider>
          <Navigation />
        </SessionProvider>
      </div>
    </header>
  );
};

export default Header;
