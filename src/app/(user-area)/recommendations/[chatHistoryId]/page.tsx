import { RecommendationBotForm } from "../_components/RecommendationBotForm";

interface RecommendationsPageProps {
  params: {
    chatHistoryId?: string;
  }
}

export default async function RecommendationsPage({ params }: RecommendationsPageProps) {
  return <div className="min-w-full md:min-w-[80%] lg:min-w-[70%] min-h-full flex flex-col flex-1 justify-center items-center">
    <RecommendationBotForm id={params.chatHistoryId!} />
  </div>
}
