import "./styles.css";

export default function FormSure({ name, onClick, message }) {
  return (
    <div>
      <label for={name} class="button flex center danger pseudo">
        {message}
      </label>

      <div className="modal ">
        <input id={name} type="checkbox" />
        <label for={name} className="overlay"></label>
        <article id="form-sure">
          <header>
            <h3>WARNING!</h3>
            <label for={name} className="close">
              &times;
            </label>
          </header>
          <section className="content">
            Are you sure? This will permanently delete all files and can not be
            reversed!
          </section>
          <footer>
            <label
              htmlFor={name}
              className="button center half success"
              onClick={onClick}
            >
              [Delete History]
            </label>
            <label for={name} className="button center dangerous half">
              [Cancel]
            </label>
          </footer>
        </article>
      </div>
    </div>
  );
}
