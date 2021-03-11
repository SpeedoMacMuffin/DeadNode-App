import "./styles.css";
import { useState } from "react";
import AdminChat from "../../Components/AdminChat";
import AdminFiles from "../../Components/AdminFiles";
import AdminPi from "../../Components/AdminPi";

export default function Admin() {
  return (
    <div className="admin-view">
      <div>
        <h1>Admin View</h1>
      </div>
      <AdminChat />
      <AdminFiles />
      <AdminPi />
    </div>
  );
}
