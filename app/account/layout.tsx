import { Suspense } from "react";
import SideNavigation from "../_components/SideNavigation";
import Spinner from "../_components/Spinner";

type LayoutPropType = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutPropType) => {
  return (
    <div className="grid h-full grid-cols-[16rem_1fr] gap-12">
      <SideNavigation />

      <Suspense
        fallback={
          <div className="flex flex-col items-center">
            <Spinner />
            <p>Loading Profile...</p>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
