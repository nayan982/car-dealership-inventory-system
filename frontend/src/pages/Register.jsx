import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiUserPlus } from "react-icons/fi";
import FormField from "../components/dashboard/FormField";
import Button from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import { required, isEmail, minLength, runValidators } from "../utils/validators";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nextErrors = runValidators(values, {
      name: [required],
      email: [required, isEmail],
      password: [required, minLength(6)],
    });
    
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await register(values);
      toast.success("Account created. Welcome to Kestrel Motors!");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Could not create account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/5 bg-obsidian-2 p-8">
        <h1 className="font-display text-2xl font-bold text-fog">Create an account</h1>
        <p className="mt-1 text-sm text-steel">Track orders and check out faster.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <FormField
            label="Full Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Rahul Sharma"
          />
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
            placeholder="At least 8 characters"
          />
          
          <Button type="submit" loading={submitting} className="w-full" icon={FiUserPlus}>
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-steel">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-ember hover:text-ember-light">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
