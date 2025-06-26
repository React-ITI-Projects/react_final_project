import { deleteMe, editeMe, getMe } from "@/api/user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddNewPost from "@/components/AddNewPost";
import UserPosts from "@/components/UserPosts";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await getMe();
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
        });
      } catch (error) {
        console.error("❌ Error fetching user:", error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      const { data } = await editeMe(formData);
      setUser(data);
      document.getElementById("closeModalBtn")?.click();
    } catch (error) {
      console.error("❌ Edit error:", error);
      alert("Failed to update profile");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account? This action cannot be undone."
    );
    if (!confirmed) return;

    try {
      await deleteMe();
      localStorage.removeItem("auth-store");
      alert("Your account has been deleted successfully.");
      navigate("/login");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete account");
    }
  };

  if (loading)
    return <div className="profile-loading">Loading your profile...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2 className="profile-title">My Profile</h2>
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">{user?.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">
                {user?.phone || "Not provided"}
              </span>
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="btn-edit"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
            >
              <i className="bi bi-pencil-fill"></i> Edit Profile
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              <i className="bi bi-trash-fill"></i> Delete Account
            </button>
          </div>
        </div>

        <AddNewPost user={user} />
        <UserPosts />
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {["name", "email", "phone"].map((field) => (
                  <div className="mb-3" key={field}>
                    <label className="form-label">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      className="form-control"
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  </div>
                ))}
              </form>
            </div>
            <div className="modal-footer">
              <button
                id="closeModalBtn"
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
