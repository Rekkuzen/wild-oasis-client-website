import Image from "next/image";
import heroBg from "@/public/bg.png";
import Link from "next/link";

const Page = () => {
  return (
    <div className="flex h-[80vh] w-full justify-center items-center">
      <Image src={heroBg} alt="Mountains and forests with two cabins" className="object-cover object-top" fill />

      <div className="relative z-10 text-center">
        <h1 className="mb-10 text-8xl font-normal tracking-tight text-primary-50">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-all hover:bg-accent-600"
        >
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );
};

export default Page;
