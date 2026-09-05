import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../schemas/register";
import registerData from "../api/register";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  type Inputs = {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  const { isError, isPending, mutate } = useMutation({
    mutationFn: registerData,
    onSuccess: (data) => {
      console.log(data, "data from register");
      toast.success(data?.message || "Account has been created succeffully.");
      navigate("/verify-account");
    },
    onError: (error: any) => {
      const backendErrors = error.response?.data?.additionalInfo?.errors;

      if (backendErrors && typeof backendErrors === "object") {
        Object.keys(backendErrors).forEach((fieldName) => {
          const fieldError = backendErrors[fieldName];
          const message = Array.isArray(fieldError)
            ? fieldError[0]
            : fieldError;
          setError(fieldName as keyof Inputs, {
            type: "server",
            message: message || "An error occurred",
          });
        });
      } else {
        toast.error(error?.message || "An error occurred during registration.");
      }
    },
  });

  const onSubmit = async (data: any) => {
    mutate(data);
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#003D34]">
      {/* Left Image */}
      <img
        src="/right.png"
        alt=""
        className="absolute left-0 bottom-0 h-[70%] w-[450px]  object-cover opacity-70"
      />

      {/* Right Image */}
      <img
        src="/left.png"
        alt=""
        className="absolute right-0 top-0 h-full w-[420px] object-cover"
      />

      {/* Logo */}
      <div className="pt-15 text-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="mx-auto  rounded-full object-cover"
        />
      </div>

      {/* Form Card */}
      <div className="relative mx-auto mt-8 max-w-[1200px] rounded-[25px] bg-[#26465A]/90 py-6 px-12 backdrop-blur-md">
        <p className="text-sm text-white/70">welcome to PMS</p>

        <h2 className="mb-8 text-4xl font-bold text-orange-400">
          Create New Account
        </h2>

        {/* Avatar */}
        <div className="mb-8 flex justify-center">
          <img
            // src={avatar}
            src="/avatar.png"
            alt="avatar"
            className="h-20 w-20 rounded-full border-4 border-white/20 object-cover"
          />
        </div>

        <form
          className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Input
              label="User Name"
              id="userName"
              placeholder="Enter your name"
              {...register("userName")}
            />
            {errors.userName && (
              <span className="text-red-500 text-sm">
                {errors.userName.message}
              </span>
            )}
          </div>

          <div>
            <Input
              label="E-mail"
              id="email"
              placeholder="Enter your E-mail"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <Input
              label="Country"
              id="country"
              placeholder="Enter your country"
              {...register("country")}
            />
            {errors.country && (
              <span className="text-red-500 text-sm">
                {errors.country.message}
              </span>
            )}
          </div>

          <div>
            <Input
              label="phoneNumber"
              id="phoneNumber"
              placeholder="Enter your phoneNumber "
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          <div>
            <PasswordInput
              label="Password"
              id="pass"
              placeholder="Enter your Password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <PasswordInput
              label="Confirm Password"
              id="confirmPassword"
              placeholder="Confirm New Password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          {/* Button */}
          <div className="mt-12 flex justify-center md:col-span-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-[300px] cursor-pointer rounded-full bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

type InputProps = {
  label: string;
  placeholder: string;
  id?: string;
  [key: string]: any;
};

function Input({ label, placeholder, id, ...rest }: InputProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-orange-400">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        id={id}
        className="w-full border-b border-white/20 bg-transparent pb-2 text-white outline-none placeholder:text-white/60 focus:border-orange-400"
        {...rest}
      />
    </div>
  );
}

function PasswordInput({ label, placeholder, id, ...rest }: InputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="relative">
      <label className="mb-1 block text-xs font-medium text-orange-400">
        {label}
      </label>

      <input
        type={isVisible ? "text" : "password"}
        placeholder={placeholder}
        id={id}
        className="w-full border-b border-white/20 bg-transparent pb-2 pr-10 text-white outline-none placeholder:text-white/60 focus:border-orange-400"
        {...rest}
      />

      <button
        type="button"
        className="absolute bottom-2 right-0 text-white/60 hover:text-white transition"
        onClick={toggleVisibility}
      >
        {isVisible ? (
          <EyeOff size={16} className="cursor-pointer" />
        ) : (
          <Eye size={16} className="cursor-pointer" />
        )}
      </button>
    </div>
  );
}
