import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import verifyFn from "../api/Verify";
import { toast } from "sonner";
import verifySchema from "../schemas/verify";
import { useNavigate } from "react-router";
import ErrorState from "@/components/shared/ErrorState";
// import avatar from "@/assets/avatar.png"; // your avatar image
type Inputs = {
  email: string;
  code: string;
};
const VerifyAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(verifySchema),
  });
  const Navigate = useNavigate();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: verifyFn,
    onSuccess: (data) => {
      console.log(data, "data from login");
      toast.success(data?.message || "Login successful");
      Navigate("/login");
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
    console.log(data, "data from login");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#003D34] max-md:px-3">
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
        className="absolute right-0 top-0 h-full w-105 object-cover max-lg:hidden"
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

        <h2 className="mb-8 text-4xl font-bold text-orange-400">Verify </h2>

        {isError && (
          <ErrorState
            className="mb-6 px-4 py-5"
            title="Verification failed"
            message="We could not verify your account. Reload the page and try again."
          />
        )}

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
            <Input
              label="code"
              placeholder="Enter your code"
              {...register("code")}
            />
            {errors.code && (
              <span className="text-red-500 text-sm">
                {errors.code.message}
              </span>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="w-[80%] cursor-pointer rounded-full bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            {isPending ? "verifing..." : "Verify Account"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default VerifyAccount;

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

// function PasswordInput({ label, placeholder }: InputProps) {
//   const [isVisible, setIsVisible] = useState(false);

//   const toggleVisibility = () => {
//     setIsVisible(!isVisible);
//   };

//   return (
//     <div className="relative">
//       <label className="mb-1 block text-xs font-medium text-orange-400">
//         {label}
//       </label>

//       <input
//         type={isVisible ? "text" : "password"}
//         placeholder={placeholder}
//         className="w-full border-b border-white/20 bg-transparent pb-2 pr-10 text-white outline-none placeholder:text-white/60 focus:border-orange-400"
//       />

//       <button
//         type="button"
//         className="absolute bottom-2 right-0 text-white/60 hover:text-white transition"
//         onClick={toggleVisibility}
//       >
//         {isVisible ? (
//           <EyeOff size={16} className="cursor-pointer" />
//         ) : (
//           <Eye size={16} className="cursor-pointer" />
//         )}
//       </button>
//     </div>
//   );
// }
