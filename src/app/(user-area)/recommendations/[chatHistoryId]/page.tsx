import { ChatbotContainer } from "../_components/ChatbotContainer";

interface RecommendationsPageProps {
  params: {
    chatHistoryId?: string;
  }
}

export default async function RecommendationsPage({ params }: RecommendationsPageProps) {
  return <ChatbotContainer chatHistoryId={params.chatHistoryId!} />
}
