import { getMe } from "@/api/user";
import { useEffect, useState } from "react"; // Added useState

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await getMe();
        setUser(response.data); // Adjust based on API response structure
      } catch (err) {
        setError("Failed to load user data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;
  if (!user) return <div className="text-center">No user data available</div>;

  return (
    <div className="card p-4 shadow-sm">
      <div className="card-body">
        <h4 className="card-title">User Profile</h4>
        <p className="card-text">
          <strong>Name:</strong> {user.name || "N/A"}
        </p>
        <p className="card-text">
          <strong>Email:</strong> {user.email || "N/A"}
        </p>
        <p className="card-text">
          <strong>Username:</strong> {user.username || "N/A"}
        </p>
        <p className="card-text">
          <strong>Phone:</strong> {user.phone || "N/A"}
        </p>
        {user.avatar && (
          <p className="card-text">
            <strong>Avatar:</strong>{" "}
            <img src={user.avatar} alt="Avatar" style={{ maxWidth: "100px" }} />
          </p>
        )}
      </div>
    </div>
  );
}
