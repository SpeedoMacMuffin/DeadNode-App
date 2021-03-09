import "./styles.css";
import { useState } from "react";

export default function FormUpload({
  onSubmit,
  uploadPercentage,
  file,
  setFile,
  filename,
  setFilename,
}) {
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    console.log(e.target.files);
  };
  return (
    <div>
      <form className="" onSubmit={onSubmit}>
        <input
          className="button message"
          type="file"
          id="customFile"
          onChange={onChange}
        />
        <label htmlFor="customFile" className="button pseudo">
          UPload
        </label>
        <input type="submit" value="[send]" className="button send-button" />
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
    </div>
  );
}
