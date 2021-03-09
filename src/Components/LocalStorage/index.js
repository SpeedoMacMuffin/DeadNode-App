import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import FormUpload from "../FormUpload";
import FileTable from "../FileTable";

export default function LocalStorage({ storageName, socket, files }) {
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [newFiles, setNewFiles] = useState([]);
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Choose file");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          setTimeout(() => setUploadPercentage(0), 2000);
        },
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });

      setFilename("");
      socket.emit("newFile");
      console.log(uploadedFile);
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.message);
      }
    }
  };

  return (
    <div>
      <FormUpload
        onSubmit={onSubmit}
        uploadPercentage={uploadPercentage}
        file={file}
        setFile={setFile}
        filename={filename}
        setFilename={setFilename}
      />
      <FileTable files={files} />
    </div>
  );
}