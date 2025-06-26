import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPosts, createPost } from "@/api/user";

export default function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        setLoading(true);
        const response = await getUserPosts();
        setPosts(response.data);
      } catch (err) {
        setError("Failed to load user posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await createPost({ title, content });
      setTitle("");
      setContent("");
      setShowForm(false);
      const response = await getUserPosts();
      setPosts(response.data);
    } catch (err) {
      setError("Failed to create post");
      console.error(err);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="card-title">User Posts</h2>
      {posts.length === 0 && !showForm ? (
        <div>
          <p className="card-text">No posts available.</p>
          <button className="btn btn-custom" onClick={() => setShowForm(true)}>
            Add New Post
          </button>
        </div>
      ) : posts.length === 0 && showForm ? (
        <form onSubmit={handleCreatePost} className="mt-3">
          <div className="mb-3 text-start">
            <label htmlFor="postTitle" className="form-label">
              Title:
            </label>
            <input
              id="postTitle"
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="postContent" className="form-label">
              Content:
            </label>
            <textarea
              id="postContent"
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-custom me-2">
              Create Post
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="list-group">
          {posts.map((post) => (
            <div key={post.id} className="list-group-item">
              <h5>{post.title}</h5>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
