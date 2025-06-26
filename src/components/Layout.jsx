import { ReactNode } from "react";

export default function Layout({ children }) {
  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <div className="p-4 bg-white shadow-sm rounded">{children}</div>
      </div>
    </div>
  );
}
