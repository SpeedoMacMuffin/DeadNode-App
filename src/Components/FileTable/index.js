import "./styles.css";
import File from "../File";
export default function FileTable({ socket, newFiles }) {
  return (
    <div>
      <div className="flex five file-table-header file-card">
        <span className="button pseudo file-button three-fifth">File</span>
        <div className="fifth center file-button button pseudo">size</div>
        <div className="button pseudo flex center">DL</div>
      </div>
      <div className="file-table">
        {newFiles.map((iteration, idx) => {
          return (
            <File
              socket={socket}
              name={iteration.name}
              path={iteration.path}
              size={iteration.size}
              key={idx}
            />
          );
        })}
      </div>
    </div>
  );
}
