import { Fragment, type ReactNode } from "react";
export function safeHref(value: string) {
  if (/^\/(?!\/)/.test(value) && !value.includes("\\")) return value;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}
function inline(text: string): ReactNode {
  return text.split(/(\[[^\]]+\]\([^\s)]+\)|\*\*[^*]+\*\*)/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
    if (link) {
      const href = safeHref(link[2]);
      return href ? (
        <a key={i} href={href}>
          {link[1]}
        </a>
      ) : (
        <Fragment key={i}>{link[1]}</Fragment>
      );
    }
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}
export function ArticleMarkdown({ content }: { content: string }) {
  const blocks: ReactNode[] = [];
  const lines = content.replace(/\r/g, "").split("\n");
  let paragraph: string[] = [];
  let items: string[] = [];
  let ordered = false;
  function flushParagraph() {
    if (paragraph.length) {
      blocks.push(<p key={blocks.length}>{inline(paragraph.join(" "))}</p>);
      paragraph = [];
    }
  }
  function flushList() {
    if (items.length) {
      const children = items.map((x, i) => <li key={i}>{inline(x)}</li>);
      blocks.push(
        ordered ? (
          <ol key={blocks.length}>{children}</ol>
        ) : (
          <ul key={blocks.length}>{children}</ul>
        ),
      );
      items = [];
    }
  }
  for (const line of lines) {
    const heading = line.match(/^(#{1,3})\s+(.+)/);
    const item = line.match(/^\s*(?:([-*])|\d+[.)])\s+(.+)/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push(
        heading[1].length < 3 ? (
          <h2 key={blocks.length}>{inline(heading[2])}</h2>
        ) : (
          <h3 key={blocks.length}>{inline(heading[2])}</h3>
        ),
      );
    } else if (item) {
      flushParagraph();
      const nextOrdered = !item[1];
      if (items.length && ordered !== nextOrdered) flushList();
      ordered = nextOrdered;
      items.push(item[2]);
    } else if (!line.trim()) {
      flushParagraph();
      flushList();
    } else {
      flushList();
      paragraph.push(line.trim());
    }
  }
  flushParagraph();
  flushList();
  return <div className="journal-body">{blocks}</div>;
}
