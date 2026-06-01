import "@/app/_styles/globals.css";
import { RootMetadataType } from "./_types/MetadataType";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationContextProvider } from "./_context/reservationContext/ReservationContextProvider";
import { Toaster } from "react-hot-toast";
type RootLayoutPropType = {
  children: React.ReactNode;
};

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: RootMetadataType = {
  title: {
    template: "Wild Oasis | %s",
    default: "Wild Oasis | Home",
  },
  description: "Lorem ipsum dolor",
};

const RootLayout = async ({ children }: RootLayoutPropType) => {
  return (
    <html lang="en" className={`${josefin.className} antialiased`}>
      <body className="relative flex min-h-screen flex-col bg-primary-950 text-primary-100">
        <Header />
        <div className="grid flex-1 px-8 py-12">
          <main className="mx-auto w-full max-w-7xl">
            <ReservationContextProvider>{children}</ReservationContextProvider>
          </main>
        </div>
        <Toaster
          toastOptions={{
            className: "rounded-xl shadow-lg text-sm",
            success: {
              className: "bg-green-600 text-white",
            },
            error: {
              className: "bg-red-600 text-white",
            },
          }}
        />
      </body>
    </html>
  );
};

export default RootLayout;
