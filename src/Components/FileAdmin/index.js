import "./styles.css";
import { useState, useEffect } from "react";
import Api from "../../Api/fileAPI";
import { fileServerUrl } from "../../Api/ServerUrls";

export default function File({ name, socket }) {
  const fileUrl = `${fileServerUrl}/upload/${name}`;
  const [fileDetail, setFileDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleteCheck, setDeleteCheck] = useState(false);

  useEffect(async () => {
    try {
      const res = await Api.get(`/local/${name}`);
      setFileDetail(res.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const deleteHandler = async () => {
    await Api.delete(`/local/${name}`);
    socket.emit("newFile");
    setDeleteCheck(false);
  };
  return (
    <div>
      <div className="flex five file-card">
        <a
          className="button pseudo file-button three-fifth"
          target="_blank"
          href={fileUrl}
        >
          {name}
        </a>
        {loading ? (
          <div className="flex five center">[loading]</div>
        ) : (
          <div className="fifth center file-button button pseudo">
            {Math.round(fileDetail.details.size * 0.00097656)}kB
          </div>
        )}
        <button
          onClick={() => setDeleteCheck(true)}
          className="button pseudo flex center file-button fifth"
        >
          delete
        </button>
      </div>
      {deleteCheck ? (
        <div>
          <span>Do you want to delete this file?</span>
          <button
            className="button send-button"
            onClick={() => deleteHandler()}
          >
            Yes
          </button>
          <button
            className="button error"
            onClick={() => setDeleteCheck(false)}
          >
            No
          </button>
        </div>
      ) : null}
    </div>
  );
}
