import "./styles.css";
import File from "../File";
export default function FileTable({ files }) {
  return (
    <div>
      <div className="flex five file-table-header file-card">
        <span className="three-fifth">File</span>
        <div>size</div>
        <div>DL</div>
      </div>
      <div className="file-table">
        {files.map((iteration, idx) => {
          return <File name={iteration} key={idx} />;
        })}
      </div>
    </div>
  );
}
