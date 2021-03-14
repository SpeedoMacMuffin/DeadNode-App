import "./styles.css";
import Api from "../../Api/fileAPI";
import { useState } from "react";
import FormSure from "../FormSure";

export default function AdminFiles({ files, setFiles, socket }) {
  const [message, setMessage] = useState("Delete All Files");
  const [usedSpace, setUsedSpace] = useState("");
  const [availableSpace, setAvailableSpace] = useState("");

  const deleteAll = async () => {
    if (files.length === 0) {
      setTimeout(() => setMessage("Delete All Files"), 3000);

      return setMessage("Folder already empty");
    }
    try {
      await files.forEach(async (file) => {
        const res = await Api.delete("/local/" + file);
        setMessage(res.data.message);
        setFiles([]);
      });
    } catch (err) {
      setMessage(err);
    }
    socket.emit("files-deleted");
    setTimeout(() => setMessage("Delete All Files"), 3000);
  };

  return (
    <div className="flex center message stats">
      <div>
        <h2 className="center flex">[File System]</h2>

        <span className="stack">Files uploaded: {files.length}</span>
        <span className="stack">Used Space:</span>
        <span className="stack">Available Space:</span>
        <FormSure name="files" message={message} onClick={deleteAll} />
      </div>
    </div>
  );
}
