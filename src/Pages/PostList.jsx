import { getPosts } from "@/api/post";
import { getUserById } from "@/api/user";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPostsWithUsernames = async () => {
    try {
      const res = await getPosts();
      const postsWithUsernames = await Promise.all(
        res.data.map(async (post) => {
          const userRes = await getUserById(post.userId);
          return {
            ...post,
            userName: userRes.data?.name || "Unknown",
          };
        })
      );
      setPosts(postsWithUsernames);
    } catch (error) {
      console.error("Error fetching posts or users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPostsWithUsernames();
  }, []);

  return (
    <div className="profile-posts-container">
      <h3 className="profile-section-title">My Posts</h3>

      {loading ? (
        <div className="profile-loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="profile-empty-posts">
          <p>You haven't created any posts yet.</p>
          <Link to="/posts/new" className="btn btn-primary">
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="profile-posts-grid">
          {posts.map((post) => (
            <div className="profile-post-card" key={post.id}>
              <Link to={`/posts/${post.id}`} className="profile-post-link">
                <div className="profile-post-content">
                  <h4 className="profile-post-title">{post.title}</h4>
                  <p className="profile-post-text">{post.content}</p>

                  {post.sections?.length > 0 && (
                    <div className="profile-post-sections">
                      <h5>Sections</h5>
                      <ul className="profile-section-list">
                        {post.sections.slice(0, 2).map((section, idx) => (
                          <li key={idx}>
                            <strong>{section.title}</strong>: {section.body}
                          </li>
                        ))}
                        {post.sections.length > 2 && (
                          <li className="text-muted">
                            +{post.sections.length - 2} more sections
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="profile-post-footer">
                  <span className="profile-post-author">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
