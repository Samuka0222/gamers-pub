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
      <main className="min-w-full min-h-full">
        {children}
      </main>
      <Footer />
    </>
  );
}
