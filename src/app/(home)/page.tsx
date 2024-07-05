import { HeaderMenu } from "@/components/HeaderMenu";
import { RecommendationBot } from "./_components/RecommendationBot";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col items-center">
      <HeaderMenu />
      <section className="w-full h-full flex flex-col items-center">
        <RecommendationBot />
      </section>
    </main>
  )
}
