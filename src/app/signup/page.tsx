"use client";
import React from "react";
import { types_set_user_signin } from "@/types/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { user_signupAuth } from "@/lib/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUP() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<types_set_user_signin>();
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();

  const onSubmit: SubmitHandler<types_set_user_signin> = async (
    data: types_set_user_signin
  ) => {
    const response = (await dispatch(user_signupAuth(data))) as {
      payload: { status: number; data: { MessageCode: string } };
    };
    if (response?.payload?.status === 201) {
      toast(response?.payload?.data?.MessageCode);
      router.push("/");
    } else {
      toast.error(response?.payload?.data?.MessageCode);
    }
    //  router.push("/")
    console.log(response);
  };

  return (
    <div className="flex justify-center items-center h-full bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 items-center justify-center min-h-md p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] relative bg-gray-150 rounded-lg shadow-2xl w-120 sm:w-1/2 md:w-1/3 lg:w-1/3"
      >
        <h1 className="text-2xl font-bold text-stone-950 mb-4">Sign Up</h1>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            First Name
          </label>
          <input
            {...register("name", { required: "First name is required" })}
            aria-invalid={errors.name ? "true" : "false"}
            className="w-full p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            className="w-full p-2 border  text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 border  text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">City</label>
          <input
            {...register("city", { required: "City is required" })}
            className="w-full p-2 border  text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.city && (
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.city.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-2 border  text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-medium mb-2">
            Repeat Password
          </label>
          <input
            type="password"
            {...register("repeat_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full p-2 border  text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.repeat_password && (
            <p role="alert" className="text-red-500 text-sm mt-1">
              {errors.repeat_password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
        <Link href="/login" className="text-blue-500 hover:underline">
          Already have an account? Login
        </Link>
        {auth?.loading && <p className="text-blue-500">Loading...</p>}
      </form>
    </div>
  );
}
