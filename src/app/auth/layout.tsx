export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="w-screen min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col justify-center items-center">
        {children}
      </main>
    </>
  );
}
