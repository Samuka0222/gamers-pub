import { HeaderMenu } from "@/components/HeaderMenu";
import { Footer } from "@/components/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderMenu />
      <main className="min-w-screen min-h-full flex flex-col justify-center items-center">
        {children}
      </main>
      <Footer />
    </>
  );
}
