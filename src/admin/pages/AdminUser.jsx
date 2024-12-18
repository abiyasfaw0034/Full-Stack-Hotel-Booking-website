/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../../auth/useSignUp";
import { useForm } from "react-hook-form";
import { useSignUpAdmin } from "../services/useSignUpAdmin";

function AdminUser() {
  const { register, handleSubmit, formState, reset, getValues } = useForm();
  const { errors } = formState;

  const navigate = useNavigate();

  const { signup, isLoading } = useSignUpAdmin();
  async function onSubmit(data) {
    const { email, password } = data;
    signup(
      {
        email,
        password,
        additionalData: { role: "admin" }, // Example additional data
      },
      { onSettled: () => reset() }
    );
  }

  return (
    <div className="p-10 rounded-lg h-screen">
      <div className="px-4 pb-4 text-5xl font-black my-8">
        Create Admin User
      </div>
      <hr className="h-[2px] bg-gray-300  dark:bg-gray-700 mb-3 px-5" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-10 text-3xl dark:bg-gray-800 bg-gray-100 rounded-md space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b-gray-200 dark:border-b-gray-700 border-b py-2">
          <label className="font-medium">Email address</label>
          <input
            disabled={isLoading}
            className="dark:bg-gray-800 border border-gray-600 p-3 shadow-sm rounded w-[50dvh]"
            type="email"
            {...register("email", { required: "This field is required" })}
          />
          {errors && (
            <p className="text-red-500 text-2xl">{errors.email?.message}</p>
          )}
          {/* <span className="text-red-500 col-start-2 col-span-2">
            {errors.email?.message}
          </span> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center border-b-gray-200 dark:border-b-gray-700 border-b py-2">
          <label className="font-medium">Password</label>
          <input
            disabled={isLoading}
            className="dark:bg-gray-800 border border-gray-600 p-3 shadow-sm rounded w-[50dvh]"
            type="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />
          {errors && (
            <p className="text-red-500 text-2xl">{errors.password?.message}</p>
          )}
          {/* <span className="text-red-500 col-start-2 col-span-2">
            {errors.email?.message}
          </span> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center border-b-gray-200 dark:border-b-gray-700 border-b py-2">
          <label className="font-medium">Confirm Password</label>
          <input
            disabled={isLoading}
            className="dark:bg-gray-800 border border-gray-600 p-3 shadow-sm rounded  w-[50dvh]"
            type="password"
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords need to match",
            })}
          />
          {errors && (
            <p className="text-red-500 text-2xl">
              {errors.passwordConfirm?.message}
            </p>
          )}
        </div>

        <div className="flex justify-end p-5 gap-10 px-10">
          <button
            onClick={reset}
            className="bg-gray-200 p-5 px-10 hover:bg-gray-500 dark:hover:bg-gray-900 dark:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button className="bg-zinc-400 p-5 px-10 dark:hover:bg-gray-900 hover:bg-gray-500 dark:bg-zinc-700 rounded-lg">
            Create User
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminUser;
{
  /* <div className="p-10 rounded-lg h-screen">
      <div className="px-4 pb-4 text-5xl font-black my-8 border-b-gray-300 dark:border-b-gray-700 border-b">
        Create Admin User
      </div>
      <hr className="h-[1.5px] bg-gray-800  dark:bg-gray-700 mb-3 px-5" /> */
}
