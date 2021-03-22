import "./styles.css";

export default function FormSurePi({ name, message, content }) {
  return (
    <div>
      <label htmlFor={name} className="button flex center danger pseudo">
        [{message}]
      </label>

      <div className="modal ">
        <input id={name} type="checkbox" />
        <label htmlFor={name} className="overlay"></label>
        <article id="form-sure">
          <header>
            <h3>WARNING!</h3>
            <label htmlFor={name} className="close">
              &times;
            </label>
          </header>
          <section className="content">{content}</section>
          <footer>
            <label htmlFor={name} className="button center half pseudo setup">
              [{message}]
            </label>
            <label htmlFor={name} className="button center danger pseudo half">
              [Cancel]
            </label>
          </footer>
        </article>
      </div>
    </div>
  );
}
