import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
// import avatar from "@/assets/avatar.png"; // your avatar image

const ForgetPassword = () => {
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

      {/* Decorative Shapes */}
      {/* <div className="absolute left-[-80px] top-[200px] h-[300px] w-[300px] rounded-full bg-red-300/30" />

      <div className="absolute right-[-120px] top-[80px] h-[300px] w-[300px] rounded-full bg-[#0F3A4D]" />

      <div className="absolute bottom-[-120px] left-[120px] h-[250px] w-[250px] rounded-full bg-[#0F3A4D]" />

      <div className="absolute bottom-[-80px] right-[120px] h-[300px] w-[300px] rounded-full bg-[#0F3A4D]" /> */}

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
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative mx-auto mt-8 max-w-167 rounded-[25px] bg-[#315951E5]/90 pt-15 px-28 backdrop-blur-md h-100"
      >
        <p className="text-sm text-white/70">welcome to PMS</p>

        <h2 className="mb-8 text-4xl font-bold text-orange-400">
          Forget password{" "}
        </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-1 mt-15">
          <Input label="E-mail" placeholder="Enter your E-mail" />
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-[80%] cursor-pointer rounded-full bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            verify
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;

type InputProps = {
  label: string;
  placeholder: string;
};

function Input({ label, placeholder }: InputProps) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-orange-400">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full border-b border-white/20 bg-transparent pb-2 text-white outline-none placeholder:text-white/60 focus:border-orange-400"
      />
    </div>
  );
}
