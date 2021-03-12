import "./styles.css";
import Api from "../../Api/fileAPI";

export default function AdminFiles() {
  const deleteAll = async () => {
    try {
      await Api.delete("/local");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="admin-files one flex center message">
      <div>
        <h1 className="center one flex">[File System]</h1>

        <span className="stack">Files uploaded:</span>
        <span className="stack">Used Space:</span>
        <span className="stack">Available Space:</span>
        <button
          onClick={() => deleteAll()}
          className="flex center danger pseudo"
        >
          Delete All Files
        </button>
      </div>
    </div>
  );
}
