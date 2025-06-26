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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(logInAndRegisterSchema),
  });
  const onSubmit = async (data) => {
    try {
      await registerAPI({ email: data.email, password: data.password }); // Adjust fields as needed
      navigate("/login");
    } catch (e) {
      console.error("Registration error:", e.response?.data || e.message);
      if (e.response?.status === 409) {
        alert("Email already in use. Please use a different email.");
      }
    } finally {
      reset();
    }
  };
  return (
    <div className="text-center">
      <h2>Register Page</h2>
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
              value="Create My User"
              className="btn btn-custom w-100"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
