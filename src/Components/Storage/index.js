import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Storage({ storageName, socket, files }) {
  const [file, setFile] = useState();
  const [filename, setFilename] = useState("Choose file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState();
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(async () => {
    await files.forEach(async (file) => {
      try {
        const res = await axios.get(`http://localhost:4000/local/${file}`);
        const newfile = res.data.data;
        const newfiles = [];
        newfiles.push(newfile);
        console.log(newfiles);
      } catch (err) {
        console.log(err);
      }
    });
  }, []);
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    console.log(e.target.files);
  };

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
  console.log(uploadPercentage);

  return (
    <div>
      {/* <div>
        <h2>{storageName}</h2>
        <div>
          <h3>[Storage Information]</h3>
          <span className="stack">Total Size: </span>
          <span className="stack">Available Size: </span>
          <span className="stack">Used Space: </span>
          <span className="stack">Files: {files.length}</span>
        </div>
      </div> */}
      <form className="" onSubmit={onSubmit}>
        <input
          className="button message"
          type="file"
          id="customFile"
          onChange={onChange}
        />
        <label for="customFile" className="button pseudo">
          UPload
        </label>
        <input type="submit" value="[send]" className="button send-button" />

        {/* custom upload-button */}
        {/* <div className="upload-btn-wrapper">
            <button className="button">Upload a file</button>
            <input type="file" name="myfile" />
          </div> */}
      </form>
      {filename ? <span className="one">{filename}</span> : null}
      {uploadPercentage > 0 ? (
        <span
          className="progress-bar"
          style={{ width: `${uploadPercentage}vw` }}
        >
          {uploadPercentage}%
        </span>
      ) : null}
      <div className="flex five file-table-header file-card">
        <span className="three-fifth">File</span>
        <div>size</div>
        <div>DL</div>
      </div>
      <div className="file-table">
        {files.map((iteration, idx) => {
          const downloadUrl = `http://localhost:4000/download/${iteration}`;
          const fileUrl = `http://localhost:4000/upload/${iteration}`;
          return (
            <div className="flex five file-card" key={idx}>
              <a
                className="button pseudo file-button three-fifth"
                target="_blank"
                href={fileUrl}
              >
                {iteration}
              </a>

              <div className="">size</div>

              <a
                target="_blank"
                href={downloadUrl}
                className="button pseudo flex center file-button fifth"
              >
                DL
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
