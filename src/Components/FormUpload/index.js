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
    console.log(e.target.files[0]);
  };
  const reset = () => {
    setFile("");
    setFilename("");
  };
  return (
    <div>
      <form
        className=""

        // enctype="multipart/form-data"
        // method="POST"
      >
        <input
          className="button message"
          type="file"
          id="customFile"
          onChange={onChange}
        />
        {!filename ? (
          <label htmlFor="customFile" className="button pseudo setup">
            [Choose File To Upload]
          </label>
        ) : null}
        {filename ? (
          <input
            type="submit"
            value="[upload]"
            className="button pseudo setup"
          />
        ) : null}
        {filename ? (
          <input
            type="reset"
            value="[cancel]"
            className="button pseudo danger"
            onClick={() => reset()}
          />
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
