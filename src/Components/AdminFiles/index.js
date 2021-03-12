import "./styles.css";
import Api from "../../Api/fileAPI";
import { useEffect, useState } from "react";
import FormSure from "../FormSure";

export default function AdminFiles({ files, socket }) {
  const [message, setMessage] = useState("Delete All Files");
  const [fileDetail, setFileDetail] = useState([]);

  const deleteAll = async () => {
    if (files.length === 0) {
      setTimeout(() => setMessage("Delete All Files"), 3000);

      return setMessage("Folder already empty");
    }
    try {
      await files.forEach(async (file) => {
        const res = await Api.delete("/local/" + file);
        setMessage(res.data.message);
      });
    } catch (err) {
      setMessage(err);
    }
    socket.emit("files-change");
    setTimeout(() => setMessage("Delete All Files"), 5000);
  };

  return (
    <div className="admin-files one flex center message">
      <div>
        <h1 className="center one flex">[File System]</h1>

        <span className="stack">Files uploaded: {files.length}</span>
        <span className="stack">Used Space:</span>
        <span className="stack">Available Space:</span>
        <FormSure name="files" message={message} onClick={deleteAll} />
      </div>
    </div>
  );
}
