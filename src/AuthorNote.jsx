import { ContactChannels } from "./ContactChannels";

export function AuthorNote({ title, body, email, locale }) {
  return (
    <section className="author-note" aria-labelledby="author-title">
      <img
        className="author-note__portrait"
        src="/images/author.jpg"
        alt="点点，点点新西兰留学咨询的在读学生作者"
      />
      <div>
        <h2 id="author-title">{title}</h2>
        <p>{body}</p>
        <a className="author-note__email" href={`mailto:${email}`}>
          {email}
        </a>
        <ContactChannels locale={locale} />
      </div>
    </section>
  );
}
