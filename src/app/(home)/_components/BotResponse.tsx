import { Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BotResponseProps {
  markdown: string;
  isPending: boolean;
}

export function BotResponse({ markdown, isPending }: BotResponseProps) {
  return (
    <div>
      {
        isPending
          ? <Loader2 className='animate-spin mt-[7px]' />
          : <ReactMarkdown className='mt-[7px]' remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      }
    </div>
  );
}
