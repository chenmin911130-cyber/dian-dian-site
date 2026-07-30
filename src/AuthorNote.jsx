export function AuthorNote({ title, body, email, emailLabel }) {
  return (
    <section className="author-note" aria-labelledby="author-title">
      <img src="/images/author.jpg" alt="" />
      <div>
        <h2 id="author-title">{title}</h2>
        <p>{body}</p>
        {email ? (
          <p className="author-note__contact">
            <span>{emailLabel}</span>
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
