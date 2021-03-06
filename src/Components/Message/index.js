import "./styles.css";

export default function Message({ content, username }) {
  return (
    // <article class="card one">
    //   <header>
    //     <span>{username}</span>
    //   </header>
    //   <footer>{content}</footer>
    // </article>
    <div className="card one ">
      <div className="message-user one ">
        <h5>{username}</h5>
      </div>
      <div className="message-content one">{content}</div>
    </div>
  );
}
