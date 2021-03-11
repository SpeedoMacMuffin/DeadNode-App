import "./styles.css";

export default function AdminFiles() {
  return (
    <div className="admin-files one flex center message">
      <div>
        <h1>[File System]</h1>

        <span className="stack">Files uploaded:</span>
        <span className="stack">Used Space:</span>
        <span className="stack">Available Space:</span>
        <button className="flex center danger pseudo">Delete All Files</button>
      </div>
    </div>
  );
}
