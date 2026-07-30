const URL_PATTERN = /(https?:\/\/[^\s<>"'）】】，。；、]+)/g;

function cleanUrl(url) {
  return url.replace(/[.,;:!?)]+$/g, "");
}

export function LinkifiedText({ text }) {
  if (!text) return null;
  const parts = String(text).split(URL_PATTERN);
  return parts.map((part, index) => {
    if (!part.startsWith("http://") && !part.startsWith("https://")) {
      return <span key={`${index}-${part.slice(0, 12)}`}>{part}</span>;
    }
    const href = cleanUrl(part);
    const trailing = part.slice(href.length);
    return (
      <span key={`${index}-${href}`}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {href.replace(/^https?:\/\//, "")}
        </a>
        {trailing}
      </span>
    );
  });
}
