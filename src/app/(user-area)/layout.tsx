import { HeaderMenu } from "@/components/HeaderMenu";
import { Footer } from "@/components/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-screen h-screen flex flex-col justify-start items-center overflow-y-auto">
      <HeaderMenu />
      {children}
      <Footer />
    </main>
  );
}
