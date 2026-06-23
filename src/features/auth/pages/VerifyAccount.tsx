import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
// import avatar from "@/assets/avatar.png"; // your avatar image

const VerifyAccount = () => {
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
      <div className="relative mx-auto mt-8 max-w-[668px] rounded-[25px] bg-[#315951E5]/90   pt-15 px-15 backdrop-blur-md h-[500px]">
        <p className="text-sm text-white/70">welcome to PMS</p>

        <h2 className="mb-8 text-4xl font-bold text-orange-400">Verify Account </h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-1 mt-10">
          <Input label="E-mail" placeholder="Enter your E-mail" />

          <PasswordInput label="OTP Verification" placeholder="Enter Verification" />
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <button className="w-[80%] cursor-pointer rounded-full bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;

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

function PasswordInput({ label, placeholder }: InputProps) {
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
        className="w-full border-b border-white/20 bg-transparent pb-2 pr-10 text-white outline-none placeholder:text-white/60 focus:border-orange-400"
      />

      <button
        type="button"
        className="absolute bottom-2 right-0 text-white/60 hover:text-white transition"
        onClick={toggleVisibility}
      >
        {isVisible ? <EyeOff size={16} className="cursor-pointer" /> : <Eye size={16} className="cursor-pointer" />}
      </button>
    </div>
  );
}
