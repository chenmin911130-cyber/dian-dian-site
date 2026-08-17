export function AuthorNote({ title, body }) {
  return (
    <section className="author-note" aria-labelledby="author-title">
      <img src="/images/author.jpg" alt="" />
      <div>
        <h2 id="author-title">{title}</h2>
        <p>{body}</p>
      </div>
    </section>
  );
}
