import "./styles.css";
import Api from "../../Api/fileAPI";
import adminApi from "../../Api/adminAPI";
import { useEffect, useState } from "react";
import FormSure from "../FormSure";

export default function AdminFiles({ files, setFiles, socket }) {
  const [message, setMessage] = useState("Delete All Files");
  const [usedSpace, setUsedSpace] = useState("");
  const [availableSpace, setAvailableSpace] = useState("");

  // useEffect(() => {
  //   const getSpace = async () => {
  //     const res = await adminApi.get("/pi/space");
  //     const newData = res.data.data.split(" ");
  //     setAvailableSpace(newData[4]);
  //     setUsedSpace(newData[6].replace("\n", ""));
  //   };
  //   getSpace();
  // }, []);

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

        <span className="stack">Files uploaded: 5</span>
        <span className="stack">Used Space: 5.5Gb</span>
        <span className="stack">Available Space: 24Gb</span>
        <FormSure name="files" message={message} />
      </div>
    </div>
  );
}
