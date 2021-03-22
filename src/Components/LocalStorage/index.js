import "./styles.css";
import { useState } from "react";
import Api from "../../Api/fileAPI";
import FormUpload from "../FormUpload";
import FileTable from "../FileTable";

export default function LocalStorage({ socket, allFiles, newFiles }) {
  const [message, setMessage] = useState();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    if (file.size > 50 * 1024 * 1024) {
      setTimeout(() => {
        setFilename("");
        setFile("");
      }, 2000);
      return setFilename("File too large! Maximum 50MB");
    }

    try {
      const res = await Api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        },
      });
      const { fileName, filePath } = res.data;
      socket.emit("file-added");
      console.log(file);
      setTimeout(() => setUploadPercentage(0), 1000);
      setMessage(message);
      setFilename("");
    } catch (err) {
      console.log(err);
      setMessage(err);
    }
  };

  return (
    <div>
      <FormUpload
        onSubmit={onSubmit}
        uploadPercentage={uploadPercentage}
        file={allFiles}
        setFile={setFile}
        filename={filename}
        setFilename={setFilename}
      />
      <FileTable files={allFiles} newFiles={newFiles} socket={socket} />
    </div>
  );
}
