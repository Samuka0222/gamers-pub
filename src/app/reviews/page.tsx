import { Gamepad, PlusCircleIcon, ScrollText } from "lucide-react";
import { Button } from "@/components/Button";
import Link from "next/link";
import { ProfileHeader } from "./_components/ProfileHeader";

export default function ReviewsPage() {
  return (
    <section className="w-full h-full px-6 py-5 flex flex-col items-center">
      <div className="w-full lg:w-[70%]">
        <ProfileHeader />
        <div className="w-full flex justify-between mt-5">
          <h1 className="text-2xl font-semibold">Reviews</h1>
          <ul className="flex gap-4 items-center font-medium">
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
            <li>
              <Button asChild>
                <Link href='reviews/create-review'>
                  <PlusCircleIcon className="mr-1" /> Review
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
