"use client";

import { useState } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import { message } from "antd";
import { submitContactForm } from "../actions";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Send the email securely using Next.js Server Action
      const result = await submitContactForm({
        name,
        email,
        message: messageText,
      });

      if (result.success) {
        messageApi.success({
          content:
            "Thanks for the message, I will get back to you as soon as I can!",
          duration: 5,
          className: "font-medium",
        });
        setName("");
        setEmail("");
        setMessageText("");
      } else {
        messageApi.error(
          "Something went wrong while sending your message. Please try again.",
        );
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      messageApi.error("Network error! Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full space-y-12">
      {contextHolder}
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-4">
        Contact Me.
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-[#0b0f19] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-[#0b0f19] border border-slate-800 rounded-lg px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
        </div>

        <textarea
          placeholder="Drop a note with any website feedback or career opportunities, or just say hi. Where are you from? :)"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          required
          rows={5}
          className="w-full bg-[#0b0f19] border border-slate-800 rounded-lg px-4 py-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
        ></textarea>

        <button
          type="submit"
          disabled={isSubmitting}
          className="send-msg-btn w-full flex items-center justify-center space-x-2 px-8 py-3.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl font-bold hover:bg-emerald-500 hover:text-slate-950 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
          <FiSend
            className={`w-5 h-5 ${isSubmitting ? "animate-pulse" : ""}`}
          />
        </button>
      </form>

      {/* Footer-like section matching image */}
      <div className="pt-24 flex items-center justify-between text-slate-500 text-sm border-t border-slate-800/50 mt-12">
        <div>
          © {new Date().getFullYear()} samyukth.com |{" "}
          <span className="font-bold">contact</span>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="https://linkedin.com/in/samyukth-dharmarajan"
            className="footer-social-link hover:text-slate-300 transition-colors"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/samyukthdraj"
            className="footer-social-link hover:text-slate-300 transition-colors"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="mailto:drajsamyukth@gmail.com"
            className="footer-social-link hover:text-slate-300 transition-colors"
          >
            <FaEnvelope className="w-5 h-5" />
          </a>
        </div>
      </div>
    </main>
  );
}
