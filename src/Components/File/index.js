import "./styles.css";

export default function File({ name }) {
  const downloadUrl = `http://deadnode.io:4000/download/${name}`;
  const fileUrl = `http://deadnode.io:4000/upload/${name}`;
  return (
    <div className="flex five file-card">
      <a
        className="button pseudo file-button three-fifth"
        target="_blank"
        href={fileUrl}
      >
        {name}
      </a>

      <div className="fifth center file-button button pseudo">Info</div>

      <a
        target="_blank"
        href={downloadUrl}
        className="button pseudo flex center file-button fifth"
      >
        DL
      </a>
    </div>
  );
}
