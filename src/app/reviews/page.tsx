import { Gamepad, ScrollText } from "lucide-react";
import { ProfileHeader } from "./_components/ProfileHeader";
import { SearchGameForm } from "./_components/SearchGameForm";
import { searchByGameName } from "@/actions/searchByGameName";

export default function ReviewsPage() {
  return (
    <section className="w-full h-full px-6 py-5 flex flex-col items-center">
      <div className="w-full lg:w-[70%]">
        <ProfileHeader />
        <div className="w-full flex justify-between mt-5">
          <h1 className="text-2xl font-semibold">Reviews</h1>
          <ul className="flex gap-4 items-end font-medium">
            <li>
              <span className="flex">
                <ScrollText className="mr-1" />
                4 Reviews
              </span>
            </li>
            <li>
              <span className="flex">
                <Gamepad className="mr-1" />
                1 Playing
              </span>
            </li>
          </ul>
        </div>
        <div>
          {/* <SearchGameForm searchGameByName={searchByGameName} /> */}
        </div>
      </div>
    </section>
  )
}
