import { useParams } from "react-router-dom";
import { getSinglePost } from "@/api/post";
import { getUserById } from "@/api/user";
import { useEffect, useState } from "react";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getSinglePost(id);
        const userRes = await getUserById(res.data.userId);
        setPost({
          ...res.data,
          userName: userRes.data?.name || "Unknown",
          createdAt: new Date(res.data.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <div className="profile-loading">Loading post...</div>;
  if (!post) return <div className="profile-error">Post not found</div>;

  return (
    <div className="profile-card single-post-view">
      <div className="single-post-header">
        <h2 className="profile-post-title">{post.title}</h2>
        <div className="single-post-meta">
          <span className="profile-post-author">By {post.userName}</span>
          <span className="post-date">{post.createdAt}</span>
        </div>
      </div>

      <div className="single-post-content">
        <p className="profile-post-text">{post.content}</p>
      </div>

      {post.sections?.length > 0 && (
        <div className="single-post-sections">
          <h5 className="section-divider">Sections</h5>
          <ul className="profile-section-list">
            {post.sections.map((section, idx) => (
              <li key={idx}>
                <strong>{section.title}</strong>
                <p>{section.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
