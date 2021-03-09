import "./styles.css";

export default function Message({ content, username }) {
  return (
    // <article class="card one">
    //   <header>
    //     <span>{username}</span>
    //   </header>
    //   <footer>{content}</footer>
    // </article>
    <div className=" message one ">
      <div className="message-user one ">
        <h4>{username}</h4>
      </div>
      <div className="message-content one">{content}</div>
    </div>
  );
}
