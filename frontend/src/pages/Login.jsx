import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiLock } from "react-icons/fi";
import FormField from "../components/dashboard/FormField";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import { required, isEmail, runValidators } from "../utils/validators";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValues((v) => ({
      ...v,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = runValidators(values, {
      email: [required, isEmail],
      password: [required],
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(firstField)?.focus();
      return;
    }

    setSubmitting(true);
    try {
      await login({
        ...values,
        email: values.email.trim(),
      });
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/5 bg-obsidian-2 p-8">
        <h1 className="font-display text-2xl font-bold text-fog">Welcome back</h1>
        <p className="mt-1 text-sm text-steel">Log in to manage your orders.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <FormField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            placeholder="you@example.com"
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="••••••••"
          />
          <Button type="submit" loading={submitting} className="w-full" icon={FiLock}>
            Log In
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-steel">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-ember hover:text-ember-light">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
