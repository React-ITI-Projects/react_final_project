import { logInAndRegisterSchema } from "@/forms/schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerAPI } from "@/api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(logInAndRegisterSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerAPI(data);
      navigate("/login");
    } catch (e) {
      console.error(e);
    } finally {
      reset();
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card auth-card">
        <h2 className="profile-section-title">Create Your Account</h2>
        <p className="auth-subtitle">Join our community today</p>

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name" className="info-label">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  className={`profile-input ${errors.name ? "is-invalid" : ""}`}
                  {...register("name")}
                  placeholder="Your full name"
                />
                {errors.name && (
                  <div className="form-error">{errors.name.message}</div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="username" className="info-label">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className={`profile-input ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  {...register("username")}
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <div className="form-error">{errors.username.message}</div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email" className="info-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`profile-input ${
                    errors.email ? "is-invalid" : ""
                  }`}
                  {...register("email")}
                  placeholder="Your email address"
                />
                {errors.email && (
                  <div className="form-error">{errors.email.message}</div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="phone" className="info-label">
                  Phone
                </label>
                <input
                  id="phone"
                  type="text"
                  className={`profile-input ${
                    errors.phone ? "is-invalid" : ""
                  }`}
                  {...register("phone")}
                  placeholder="Your phone number"
                />
                {errors.phone && (
                  <div className="form-error">{errors.phone.message}</div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="password" className="info-label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className={`profile-input ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password")}
                  placeholder="Create a password"
                />
                {errors.password && (
                  <div className="form-error">{errors.password.message}</div>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="avatar" className="info-label">
                  Avatar URL
                </label>
                <input
                  id="avatar"
                  type="text"
                  className={`profile-input ${
                    errors.avatar ? "is-invalid" : ""
                  }`}
                  {...register("avatar")}
                  placeholder="Optional profile image URL"
                />
                {errors.avatar && (
                  <div className="form-error">{errors.avatar.message}</div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group mt-4">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Creating Account...
                </>
              ) : (
                "Register Now"
              )}
            </button>
          </div>

          <div className="text-center mt-3">
            <p className="auth-footer-text">
              Already have an account?{" "}
              <a href="/login" className="auth-link">
                Sign in here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
