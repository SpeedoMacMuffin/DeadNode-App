import "./styles.css";

export default function FormUpload({
  onSubmit,
  uploadPercentage,
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
        {!filename ? (
          <label htmlFor="customFile" className="button pseudo setup">
            [Upload File]
          </label>
        ) : null}
        {filename ? (
          <input type="submit" value="[send]" className="button send-button" />
        ) : null}
      </form>
      {filename ? <h4>{filename}</h4> : null}
      {uploadPercentage > 0 ? (
        <span
          className="message upload-percentage flex center"
          style={{ width: `${uploadPercentage}%` }}
        >
          {uploadPercentage}% completed!
        </span>
      ) : null}
    </div>
  );
}
