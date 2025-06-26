import { getMe } from "@/api/user";
import { useEffect } from "react";

export default function Profile() {
  useEffect(() => {
    getMe();
  }, []);
  return (
    <div className="card p-4 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">User Profile</h4>
        <p className="card-text">
          User info will be displayed here (e.g., name, email)
        </p>
      </div>
    </div>
  );
}
