import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { loginSchema } from "@/schemas/loginSchema";
import type { LoginFormValues } from "@/schemas/loginSchema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    alert(`Logging in with: ${data.email}`);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

      {/* Email */}
      <div className="space-y-1">
        <Input {...register("email")} placeholder="Email" />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <Input type="password" {...register("password")} placeholder="Password" />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
