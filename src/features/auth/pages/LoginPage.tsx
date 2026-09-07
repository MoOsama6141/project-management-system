import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import loginSchema from "../schemas/login";
import { useMutation } from "@tanstack/react-query";
import loginFn from "../api/login";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/app/store/auth.store";
import { jwtDecode } from "jwt-decode";

type Inputs = {
  email: string;
  password: string;
};
interface TokenPayload {
  userEmail: string;
  userGroup: string;
  userName: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
  });

  const Navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginFn,
    onSuccess: (data) => {
      const decoded = jwtDecode(data?.token) as TokenPayload;
      console.log(decoded, "decoded........");

      const normalizedRole = decoded.userGroup?.toLowerCase() || "employee";

      window.localStorage.setItem("token", data?.token);
      window.localStorage.setItem("email", decoded?.userEmail);
      localStorage.setItem("role", normalizedRole);

      useAuthStore.setState({
        token: data?.token,
        email: decoded?.userEmail,
        role: normalizedRole as "manager" | "employee" | "admin" | "user",
      });
      console.log(data, "data from login");
      toast.success(data?.message || "Login successful");
      window.localStorage.setItem("token", data?.token);
      Navigate("/dashboard");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
    console.log(data, "data from login");
  };
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#003D34]">
      {/* Left Image */}
      <motion.img
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 0.7, x: 0 }}
        transition={{ duration: 0.6 }}
        src="/right.png"
        alt=""
        className="absolute left-0 bottom-0 h-[70%] w-112.5 object-cover opacity-70"
      />

      {/* Right Image */}
      <motion.img
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        src="/left.png"
        alt=""
        className="absolute right-0 top-0 h-full w-105 object-cover"
      />
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-15 text-center"
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="mx-auto rounded-full object-cover"
        />
      </motion.div>

      {/* Form Card */}
      <motion.form
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative mx-auto mt-8 max-w-167 rounded-[25px] bg-[#315951E5]/90 pt-15 px-15 backdrop-blur-md h-125"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-sm text-white/70">welcome to PMS</p>

        <h2 className="mb-8 text-4xl font-bold text-orange-400">Login </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-1 mt-10">
          <div>
            <Input
              label="E-mail"
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
            <PasswordInput
              label="Password"
              placeholder="Enter your Password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm text-white/70">
          <a href="/register">register now ?</a>
          {/* <a href="/forget-password">forget password ? </a> */}
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-[80%] cursor-pointer rounded-full bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            {isPending ? "Logging in..." : "Login"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default LoginPage;

type InputProps = {
  label: string;
  placeholder: string;
};

function Input({ label, placeholder, ...rest }: InputProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-orange-400">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        {...rest}
        className="w-full border-b border-white/20 bg-transparent pb-2 text-white outline-none placeholder:text-white/60 focus:border-orange-400"
      />
    </div>
  );
}

function PasswordInput({ label, placeholder, ...rest }: InputProps) {
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
        {...rest}
        className="w-full border-b border-white/20 bg-transparent pb-2 pr-10 text-white outline-none placeholder:text-white/60 focus:border-orange-400"
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
