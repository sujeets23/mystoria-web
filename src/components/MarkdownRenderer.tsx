import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) return null;

  // Split content into blocks by double newlines or horizontal rules
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let inCodeBlock = false;
  let codeBlockLines: string[] = [];

  const flushList = (key: string) => {
    if (currentList.length > 0) {
      if (listType === 'ol') {
        elements.push(
          <ol key={key} className="my-6 space-y-3 list-decimal list-inside text-neutral-300 font-light leading-relaxed pl-2">
            {currentList.map((item, idx) => (
              <li key={idx} className="marker:text-crimson marker:font-mono">
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={key} className="my-6 space-y-3 text-neutral-300 font-light leading-relaxed pl-2">
            {currentList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-crimson mt-2.5 shrink-0" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
      }
      currentList = [];
      listType = null;
    }
  };

  const renderInline = (text: string): React.ReactNode => {
    // Process bold (**text**), italics (*text*), inline code (`code`), links ([text](url))
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let idx = 0;

    while (remaining.length > 0) {
      // Bold + Italic or Bold: **bold**
      const boldMatch = remaining.match(/^(\*\*|__)(.*?)\1/);
      if (boldMatch) {
        parts.push(
          <strong key={idx++} className="font-semibold text-white">
            {boldMatch[2]}
          </strong>
        );
        remaining = remaining.slice(boldMatch[0].length);
        continue;
      }

      // Italic: *italic* or _italic_
      const italicMatch = remaining.match(/^(\*|_)(.*?)\1/);
      if (italicMatch) {
        parts.push(
          <em key={idx++} className="italic text-neutral-200">
            {italicMatch[2]}
          </em>
        );
        remaining = remaining.slice(italicMatch[0].length);
        continue;
      }

      // Inline code: `code`
      const codeMatch = remaining.match(/^`([^`]+)`/);
      if (codeMatch) {
        parts.push(
          <code key={idx++} className="px-2 py-0.5 rounded bg-white/[0.08] text-crimson-bright font-mono text-sm border border-white/10">
            {codeMatch[1]}
          </code>
        );
        remaining = remaining.slice(codeMatch[0].length);
        continue;
      }

      // Link: [text](url)
      const linkMatch = remaining.match(/^\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        parts.push(
          <a
            key={idx++}
            href={linkMatch[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-crimson hover:underline underline-offset-4 font-medium transition-colors"
          >
            {linkMatch[1]}
          </a>
        );
        remaining = remaining.slice(linkMatch[0].length);
        continue;
      }

      // Normal text character
      const nextSpecial = remaining.search(/[\*_`\[]/);
      if (nextSpecial === -1) {
        parts.push(remaining);
        break;
      } else if (nextSpecial === 0) {
        parts.push(remaining[0]);
        remaining = remaining.slice(1);
      } else {
        parts.push(remaining.slice(0, nextSpecial));
        remaining = remaining.slice(nextSpecial);
      }
    }

    return parts;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle ```
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <div key={`code-${i}`} className="my-6 rounded-xl overflow-hidden border border-white/10 bg-[#0C0C0C]">
            <div className="px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] text-xs font-mono text-neutral-500 uppercase flex items-center justify-between">
              <span>Code Snippet</span>
              <span className="w-2 h-2 rounded-full bg-crimson/80" />
            </div>
            <pre className="p-5 overflow-x-auto text-xs sm:text-sm font-mono text-neutral-300 leading-relaxed">
              <code>{codeBlockLines.join('\n')}</code>
            </pre>
          </div>
        );
        codeBlockLines = [];
        inCodeBlock = false;
      } else {
        flushList(`list-before-code-${i}`);
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    const trimmed = line.trim();

    // Empty line
    if (!trimmed) {
      flushList(`list-${i}`);
      continue;
    }

    // Horizontal Rule: --- or ***
    if (trimmed === '---' || trimmed === '***') {
      flushList(`list-${i}`);
      elements.push(
        <hr key={`hr-${i}`} className="my-10 border-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      );
      continue;
    }

    // H1: # Title (we style as high-impact subheader)
    if (trimmed.startsWith('# ')) {
      flushList(`list-${i}`);
      elements.push(
        <h2 key={`h1-${i}`} className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white mt-12 mb-4">
          {renderInline(trimmed.slice(2))}
        </h2>
      );
      continue;
    }

    // H2: ## Subtitle
    if (trimmed.startsWith('## ')) {
      flushList(`list-${i}`);
      elements.push(
        <h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight text-white mt-10 mb-4 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-crimson shrink-0" />
          <span>{renderInline(trimmed.slice(3))}</span>
        </h2>
      );
      continue;
    }

    // H3: ### Section
    if (trimmed.startsWith('### ')) {
      flushList(`list-${i}`);
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg sm:text-xl font-display font-semibold tracking-normal text-neutral-100 mt-8 mb-3">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      continue;
    }

    // Blockquote: > quote
    if (trimmed.startsWith('> ')) {
      flushList(`list-${i}`);
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-8 pl-6 border-l-2 border-crimson bg-gradient-to-r from-crimson/[0.06] to-transparent py-4 pr-6 rounded-r-xl"
        >
          <p className="font-display text-lg sm:text-xl text-neutral-100 italic font-light leading-relaxed">
            {renderInline(trimmed.slice(2))}
          </p>
        </blockquote>
      );
      continue;
    }

    // Unordered List: - item or * item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (listType !== 'ul') {
        flushList(`list-change-${i}`);
        listType = 'ul';
      }
      currentList.push(trimmed.slice(2));
      continue;
    }

    // Ordered List: 1. item
    const olMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (olMatch) {
      if (listType !== 'ol') {
        flushList(`list-change-${i}`);
        listType = 'ol';
      }
      currentList.push(olMatch[2]);
      continue;
    }

    // Standard Paragraph
    flushList(`list-${i}`);
    elements.push(
      <p key={`p-${i}`} className="my-4 text-neutral-300 font-light leading-relaxed text-base sm:text-lg">
        {renderInline(trimmed)}
      </p>
    );
  }

  flushList('list-end');

  return <div className="space-y-2">{elements}</div>;
};
