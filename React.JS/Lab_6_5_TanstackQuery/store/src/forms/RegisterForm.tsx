import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { registerSchema } from "@/schemas/registerSchema";
import type { RegisterFormValues } from "@/schemas/registerSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    alert(JSON.stringify(data, null, 2));
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 space-y-4">
      {/* Name */}
      <div className="space-y-1">
        <Input {...register("name")} placeholder="Name" />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Input {...register("email")} placeholder="Email" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>
      {/* Username */}
      <div className="space-y-1">
        <Input {...register("username")} placeholder="Username" />
        {errors.username && <p className="text-red-500 text-xs">{errors.username.message}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <Input type="password" {...register("password")} placeholder="Password" />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <Input type="password" {...register("confirmPassword")} placeholder="Confirm Password" />
        {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
