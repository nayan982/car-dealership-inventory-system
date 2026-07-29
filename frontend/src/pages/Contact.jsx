import { useState } from "react";
import toast from "react-hot-toast";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import FormField from "../components/dashboard/FormField";
import Button from "../components/common/Button";
import { required, isEmail, runValidators } from "../utils/validators";

const initialValues = {
  name: "",
  email: "",
  message: "",
};

const contactInfo = [
  {
    icon: FiMapPin,
    label: "Showroom",
    value: "45 MG Road, Bengaluru, Karnataka, India",
  },
  {
    icon: FiPhone,
    label: "Phone",
    value: "+91 98765 43210",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "hello@kestrelmotors.com",
  },
];

const Contact = () => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = ({ target }) => {
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = runValidators(values, {
      name: [required],
      email: [required, isEmail],
      message: [required],
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    setSubmitting(false);
    toast.success("Message sent. We'll get back to you shortly.");
    setValues(initialValues);
  };

  return (
    <div className="px-5 py-16 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ember">
            Get in touch
          </p>

          <h1 className="mt-3 font-display text-4xl font-bold text-fog">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-lg text-sm text-steel-light">
            Questions about a listing, financing, or an existing order? Send us
            a message.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-2xl border border-white/5 bg-obsidian-2 p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ember/10 text-ember">
                  <Icon size={18} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-steel">
                    {label}
                  </p>

                  <p className="mt-1 text-sm font-medium text-fog">
                    {value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-white/5 bg-obsidian-2 p-6 lg:col-span-3 lg:p-8"
          >
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
              as="textarea"
              label="Message"
              name="message"
              value={values.message}
              onChange={handleChange}
              error={errors.message}
              placeholder="Tell us what you need help with..."
            />

            <Button
              type="submit"
              loading={submitting}
              className="w-full"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;