export function AuthorNote({ title, body, email }) {
  return (
    <section className="author-note" aria-labelledby="author-title">
      <img src="/images/author.jpg" alt="点点，点点新西兰留学咨询的在读学生作者" />
      <div>
        <h2 id="author-title">{title}</h2>
        <p>{body}</p>
        <a className="author-note__email" href={`mailto:${email}`}>{email}</a>
      </div>
    </section>
  );
}
