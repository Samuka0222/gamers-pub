import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function BotResponse({ markdown }: { markdown: string }) {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
