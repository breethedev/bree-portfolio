"use client";

import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import s from "./Contact.module.css";

export default function Contact() {
  const contactRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    position: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("contact__content--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission
    try {
      await emailjs
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
          {
            from_name: formData.fullName,
            from_email: formData.email,
            message: `${formData.position ? `Position: ${formData.position}\n` : ""}${formData.message}`,
          },
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
        .then(() => {
          setSubmitStatus("success");
        })
        .catch((error) => {
          setSubmitStatus("error");
          console.error("Error sending email:", error);
        });
      setFormData({
        fullName: "",
        email: "",
        position: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullName.trim() && formData.email.trim() && formData.message.trim();

  return (
    <section id="contact" className={s["contact"]} ref={contactRef}>
      <div className={`container ${s["contact__container"]}`}>
        <div className={s["contact__content"]}>
          <h2 className={s["contact__title"]}>Get In Touch</h2>

          <div className={s["contact__grid"]}>
            <div className={s["contact__info"]}>
              <h3 className={s["contact__info-title"]}>Let&apos;s Work Together</h3>
              <p className={s["contact__info-description"]}>
                I&apos;m always interested in new opportunities and exciting projects. Whether you
                have a question or just want to say hi, feel free to reach out.
              </p>

              <div className={s["contact__methods"]}>
                <div className={s["contact__method"]}>
                  <span className={s["contact__method-label"]}>Email:</span>
                  <a href="mailto:bree@breethedev.com" className={s["contact__method-value"]}>
                    bree@breethedev.com
                  </a>
                </div>

                <div className={s["contact__method"]}>
                  <span className={s["contact__method-label"]}>LinkedIn:</span>
                  <a
                    href="https://linkedin.com/in/breeana-payton"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s["contact__method-value"]}
                  >
                    linkedin.com/in/breeana-payton
                  </a>
                </div>
              </div>
            </div>

            <div className={s["contact__form-container"]}>
              <form onSubmit={handleSubmit} className={s["contact__form"]}>
                <div className={s["contact__form-group"]}>
                  <label htmlFor="fullName" className={s["contact__label"]}>
                    Full Name <span className={s["contact__required"]}>*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={s["contact__input"]}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className={s["contact__form-group"]}>
                  <label htmlFor="email" className={s["contact__label"]}>
                    Email <span className={s["contact__required"]}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={s["contact__input"]}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className={s["contact__form-group"]}>
                  <label htmlFor="position" className={s["contact__label"]}>
                    Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className={s["contact__input"]}
                    placeholder="Your position (optional)"
                  />
                </div>

                <div className={s["contact__form-group"]}>
                  <label htmlFor="message" className={s["contact__label"]}>
                    Message <span className={s["contact__required"]}>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={s["contact__textarea"]}
                    required
                    rows={5}
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                <button
                  type="submit"
                  className={`${s.btn} ${s["btn--primary"]} ${s.contact__submit} ${!isFormValid ? "contact__submit--disabled" : ""}`}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <div className={`${s["contact__message"]} ${s["contact__message--success"]}`}>
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className={`${s["contact__message"]} ${s["contact__message--error"]}`}>
                    Something went wrong. Please try again.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
