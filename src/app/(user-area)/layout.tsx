import { HeaderMenu } from "@/components/HeaderMenu";
import { Footer } from "@/components/Footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full min-h-screen flex flex-1 flex-col justify-start items-center">
      <HeaderMenu />
      {children}
      <Footer />
    </main>
  );
}
