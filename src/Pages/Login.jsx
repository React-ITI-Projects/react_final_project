import { logInAPI } from "@/api/auth";
import { logInAndRegisterSchema } from "@/forms/schema";
import { useAuthStore } from "@/store/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const { search } = useLocation();
  const { redirectTo } = qs.parse(search, { ignoreQueryPrefix: true });
  const navigate = useNavigate();
  const { setTokens } = useAuthStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInAndRegisterSchema),
  });
  const onSubmit = async (data) => {
    try {
      const res = await logInAPI({
        email: data.email,
        password: data.password,
      }); // Match API payload
      setTokens(res.data); // Adjust based on API response structure
      navigate(redirectTo ?? "/");
    } catch (e) {
      console.error("Login error:", e.response?.data || e.message);
    } finally {
      // reset();
    }
  };
  return (
    <div className="text-center">
      <h2>Login Page</h2>
      <div className="mt-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4 bg-light border rounded w-50 mx-auto"
        >
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="form-control"
              {...register("email", {})}
            />
            <p className="text-danger small">{errors?.email?.message}</p>
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              {...register("password", {})}
            />
            <p className="text-danger small">{errors?.password?.message}</p>
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Log In"
              className="btn btn-custom w-100"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
