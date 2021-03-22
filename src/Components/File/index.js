import "./styles.css";
import { fileServerUrl } from "../../Api/ServerUrls";

export default function File({ name, path, size }) {
  const downloadUrl = `${fileServerUrl}/download/${name}`;
  const fileUrl = `${fileServerUrl}/upload/${name}`;

  return (
    <div className="flex five file-card">
      <a
        className="button pseudo file-button three-fifth"
        target="_blank"
        rel="noreferrer"
        href={fileUrl}
      >
        {name}
      </a>

      <div className="fifth center file-button button pseudo">
        {Math.round(size * 0.00097656)}kB
      </div>

      <a
        target="_blank"
        rel="noreferrer"
        href={downloadUrl}
        className="button pseudo flex center file-button fifth"
      >
        DL
      </a>
    </div>
  );
}
