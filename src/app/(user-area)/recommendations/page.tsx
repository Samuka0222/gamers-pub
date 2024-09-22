import { ChatbotContainer } from "./_components/ChatbotContainer";

export default async function RecommendationsPage() {
  return (
    <div className="w-full min-h-full flex flex-1 justify-center items-center">
      <ChatbotContainer chatHistoryId="" />
    </div>
  )
}
