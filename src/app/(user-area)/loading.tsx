import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-w-full min-h-screen flex flex-col justify-center items-center">
      <Loader2 className="animate-spin" />
    </main>
  )
}
