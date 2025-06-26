import React, { useEffect, useState } from "react";
import { getPosts, editPostsAPI, deletePostsAPI } from "@/api/post";
import { getMe } from "@/api/user";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Modal } from "bootstrap";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userRes = await getMe();
        const postsRes = await getPosts();
        const filtered = postsRes.data.filter(
          (post) => post.userId === userRes.data.id
        );
        setUserPosts(filtered);
      } catch (error) {
        console.error("Error fetching user or posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const openEditModal = (post) => {
    setEditingPost(post);
    setEditForm({ title: post.title, content: post.content });
    const modal = new Modal(document.getElementById("editPostModal"));
    modal.show();
  };

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditSubmit = async () => {
    try {
      await editPostsAPI(editingPost.id, editForm);
      setUserPosts((prev) =>
        prev.map((p) => (p.id === editingPost.id ? { ...p, ...editForm } : p))
      );
      Modal.getInstance(document.getElementById("editPostModal"))?.hide();
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  const handleDeletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (!confirmDelete) return;

    try {
      await deletePostsAPI(id);
      setUserPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="mt-5">
      <h4 className="text-primary fw-semibold mb-4">Your Posts</h4>

      {loading ? (
        <p className="text-muted">Loading your posts...</p>
      ) : userPosts.length === 0 ? (
        <div className="alert alert-warning shadow-sm rounded-3">
          You haven’t posted anything yet.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {userPosts.map((post) => (
            <div className="col" key={post.id}>
              <div className="card shadow-sm h-100 border-0 rounded-4">
                <div className="card-body">
                  <h5 className="card-title text-dark fw-bold">{post.title}</h5>
                  <p className="card-text text-muted">
                    {post.content.length > 120
                      ? post.content.slice(0, 120) + "..."
                      : post.content}
                  </p>

                  {post.sections?.length > 0 && (
                    <div className="mt-3">
                      <h6 className="text-secondary fw-semibold">Sections</h6>
                      <ul className="list-group list-group-flush">
                        {post.sections.map((section, idx) => (
                          <li
                            className="list-group-item ps-0 border-0"
                            key={idx}
                          >
                            <strong>{section.title}</strong>: {section.body}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-white border-0 d-flex justify-content-end gap-2">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => openEditModal(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Post Modal */}
      <div
        className="modal fade"
        id="editPostModal"
        tabIndex="-1"
        aria-labelledby="editPostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-4 shadow-sm">
            <div className="modal-header bg-primary bg-opacity-10 border-0">
              <h5
                className="modal-title fw-semibold text-primary"
                id="editPostModalLabel"
              >
                Edit Post
              </h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  type="text"
                  className="form-control shadow-sm"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Content</label>
                <textarea
                  className="form-control shadow-sm"
                  name="content"
                  rows="4"
                  value={editForm.content}
                  onChange={handleEditChange}
                />
              </div>
            </div>
            <div className="modal-footer border-0 pt-3">
              <button
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-success px-4"
                onClick={handleEditSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
