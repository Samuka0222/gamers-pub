import { Textarea } from "./Textarea";

interface TextEditorProps {
  reviewText: string;
  setReviewText: (text: string) => void;
  addNewLineAction: () => void
}

export function TextEditor({ reviewText, setReviewText, addNewLineAction }: TextEditorProps) {
  return (
    <div>
      <Textarea
        name="review-text"
        className="w-full text-base resize-y min-h-[155px] overflow-y-auto focus-visible:outline-none focus-visible:ring-offset-0"
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        onKeyDownCapture={(e) => {
          if (e.key === 'Enter') {
            addNewLineAction();
            e.preventDefault();
          }
        }}
      />
    </div>
  )
}
