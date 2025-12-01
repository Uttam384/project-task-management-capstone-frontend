import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../slices/authSlice';

const Register = () => {

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm();

  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [status, setStatus] = useState("idle");

  const onSubmit = async (data) => {
    setStatus("loading");
    setServerError("");

    try {
      console.log("Register Data:", data);

      // await new Promise(res => setTimeout(res, 1200));
      dispatch(registerUser(data));

      // Success case here
    } catch (err) {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white max-w-xl w-full rounded-md shadow-lg relative">
        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-serif mb-2">Create an account</h2>
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Username */}
            <div>
              <label className="text-xs font-semibold text-gray-600">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 3, message: "Minimum 3 characters" }
                })}
                onFocus={() => clearErrors("username")}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm 
                ${errors.username ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.username && (
                <p className="text-xs text-red-600 mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                onFocus={() => clearErrors("email")}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm 
                ${errors.email ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-gray-600">Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  onFocus={() => clearErrors("password")}
                  className={`block w-full rounded-md border px-3 py-2 pr-10 shadow-sm 
                  ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Role Dropdown */}
            <div>
              <label className="text-xs font-semibold text-gray-600">Role</label>
              <select
                {...register("role", {
                  required: "Role is required",
                })}
                onFocus={() => clearErrors("role")}
                className={`mt-1 block w-full rounded-md border px-3 py-2 shadow-sm bg-white
                ${errors.role ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select role</option>
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.role && (
                <p className="text-xs text-red-600 mt-1">{errors.role.message}</p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <div className="text-sm text-red-600">{serverError}</div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={status === "loading" || isSubmitting}
                className={`w-full inline-flex cursor-pointer items-center justify-center px-6 py-2 rounded-full text-white font-medium
                ${status === "loading" || isSubmitting ? "bg-gray-400" : "bg-black hover:opacity-90"}`}
              >
                {status === "loading" || isSubmitting
                  ? "Creating account..."
                  : "Register"}
              </button>
            </div>

            {/* Back link */}
            <div className="pt-4 text-center text-sm text-gray-500">
              <a href="/login" className="hover:underline">
                Already have an account?
              </a>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
