import { SearchGameForm } from "./_components/SearchGameForm";
import { searchByGameName } from "@/actions/searchByGameName";

export default function CreateReviewPage() {
  return (
    <section className="w-full h-full py-6 px-5 flex flex-col items-center">
      <div className="w-full lg:max-w-[70%]">
        <SearchGameForm searchGameByName={searchByGameName} />
      </div>
    </section>
  )
}
