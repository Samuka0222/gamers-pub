import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw'

interface MarkdownTextProps {
  markdown: string;
  isPending: boolean;
}

export function MarkdownText({ markdown, isPending }: MarkdownTextProps) {
  const formatText = (markdown: string) => {
    const regexStar = /^\s*\*/gm;
    const regexNewLine = /\n/g;

    // Resolve this if needed
    return markdown;
  }

  return (
    <div>
      {
        isPending
          ? <Loader2 className='animate-spin mt-[7px]' />
          : <ReactMarkdown className='mt-[7px]' remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{formatText(markdown)}</ReactMarkdown>
      }
    </div>
  );
}
