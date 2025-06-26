import React, { useState } from "react";
import { postsAPI } from "@/api/post";
import "../Pages/Profile";

const AddNewPost = ({ user }) => {
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    sectionTitle: "",
    sectionBody: "",
  });

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreatePost = async () => {
    try {
      const newPost = {
        title: postForm.title,
        content: postForm.content,
        userId: user.id,
        sections: [
          {
            title: postForm.sectionTitle,
            body: postForm.sectionBody,
          },
        ],
      };
      await postsAPI(newPost);
      alert("Post created successfully!");
      document.getElementById("closePostModal")?.click();
      setPostForm({
        title: "",
        content: "",
        sectionTitle: "",
        sectionBody: "",
      });
    } catch (error) {
      console.error("Post creation error:", error);
      alert("Failed to create post.");
    }
  };

  return (
    <>
      <div className="profile-actions">
        <button
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#newPostModal"
        >
          <i className="bi bi-plus-lg me-2"></i> Create New Post
        </button>
      </div>

      <div
        className="modal fade"
        id="newPostModal"
        tabIndex="-1"
        aria-labelledby="newPostModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content profile-card">
            <div className="modal-header border-0 pb-0">
              <h5
                className="modal-title profile-section-title"
                id="newPostModalLabel"
              >
                Create New Post
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body pt-0">
              <div className="row g-3">
                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label info-label">Post Title</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control profile-input"
                      placeholder="Enter post title..."
                      value={postForm.title}
                      onChange={handlePostChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group">
                    <label className="form-label info-label">Content</label>
                    <textarea
                      name="content"
                      rows="4"
                      className="form-control profile-input"
                      placeholder="Write your content here..."
                      value={postForm.content}
                      onChange={handlePostChange}
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="profile-divider">
                    <span>Optional Section</span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label info-label">
                      Section Title
                    </label>
                    <input
                      type="text"
                      name="sectionTitle"
                      className="form-control profile-input"
                      placeholder="Section title..."
                      value={postForm.sectionTitle}
                      onChange={handlePostChange}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label info-label">
                      Section Body
                    </label>
                    <textarea
                      name="sectionBody"
                      rows="2"
                      className="form-control profile-input"
                      placeholder="Section body..."
                      value={postForm.sectionBody}
                      onChange={handlePostChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer border-0 pt-0">
              <button
                id="closePostModal"
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreatePost}
                disabled={!postForm.title || !postForm.content}
              >
                <i className="bi bi-send-fill me-2"></i>Publish Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewPost;
