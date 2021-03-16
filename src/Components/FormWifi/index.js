import "./styles.css";

export default function FormWifi({ name, onClick, message }) {
  return (
    <div>
      <label htmlFor={name} className="button flex center setup pseudo">
        [{message}]
      </label>

      <div className="modal ">
        <input id={name} type="checkbox" />
        <label htmlFor={name} className="overlay"></label>
        <article id="form-wifi">
          <header>
            <h3>WARNING!</h3>
            <label htmlFor={name} className="close">
              &times;
            </label>
          </header>
          <form></form>
          <footer>
            <label
              htmlFor={name}
              className="button center half pseudo setup"
              onClick={onClick}
            >
              [Delete]
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
