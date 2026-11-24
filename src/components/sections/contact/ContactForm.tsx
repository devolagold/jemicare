"use client";

import { type FormEvent, useState } from "react";
import { CONTACT_SUBJECTS } from "@/data/contact";

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-form-card flex flex-col items-center justify-center rounded-[20px] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(19,19,22,0.8)_0%,rgba(19,19,22,0.05)_100%)] px-6 py-14 text-center sm:px-8 sm:py-16">
        <span className="">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M69.3845 52.1717C73.0475 56.9862 72.6816 63.8873 68.2844 68.2844C63.8873 72.6815 56.9862 73.0475 52.1717 69.3845C51.3565 75.3794 46.2184 80 40 80C33.7816 80 28.6436 75.3793 27.8283 69.3845C23.0137 73.0475 16.1127 72.6816 11.7156 68.2844C7.31851 63.8872 6.95252 56.9862 10.6155 52.1717C4.62058 51.3566 0 46.2185 0 40C0 33.7816 4.62068 28.6436 10.6155 27.8283C6.95252 23.0138 7.31842 16.1127 11.7156 11.7156C16.1127 7.31851 23.0138 6.95252 27.8283 10.6155C28.6435 4.62058 33.7816 0 40 0C46.2184 0 51.3564 4.62068 52.1717 10.6155C56.9863 6.95252 63.8873 7.31841 68.2844 11.7156C72.6815 16.1128 73.0475 23.0138 69.3845 27.8283C75.3794 28.6435 80 33.7816 80 40C80 46.2185 75.3793 51.3565 69.3845 52.1717Z" fill="#EDB01A" />
            <path d="M39.9993 53.3334C47.3631 53.3334 53.3327 47.3638 53.3327 40C53.3327 32.6362 47.3631 26.6667 39.9993 26.6667C32.6355 26.6667 26.666 32.6362 26.666 40C26.666 47.3638 32.6355 53.3334 39.9993 53.3334ZM47.2755 36.6095L38.666 45.219L33.0565 39.6095L34.9422 37.7239L38.666 41.4478L45.3899 34.7239L47.2755 36.6095Z" fill="white" />
          </svg>

        </span>
        <h2 className="mt-5 font-display text-[24px] font-bold leading-[28px] tracking-[-0.02em] text-white">
          Message received
        </h2>
        <p className="mt-2.5 max-w-[340px] text-[15px] leading-[22px] text-brand-grey-light">
          Thank you, {form.fullName || "friend"}. A member of the JemiCare
          Foundation team will get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(INITIAL_STATE);
            setSubmitted(false);
          }}
          className="mt-7 flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-[14px] font-medium leading-[18px] tracking-[-0.02em] text-black shadow-[inset_0_2px_0_rgba(0,0,0,0.2)] transition-[transform,opacity] duration-150 hover:opacity-[0.88] active:scale-[0.98]"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form-card flex flex-col gap-5 rounded-[20px] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(19,19,22,0.8)_0%,rgba(19,19,22,0.05)_100%)] p-6 sm:p-8"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-full-name"
          className="text-[13px] font-medium leading-[18px] text-white/90"
        >
          Full name
        </label>
        <input
          id="contact-full-name"
          name="fullName"
          type="text"
          required
          value={form.fullName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, fullName: e.target.value }))
          }
          placeholder="Please provide your full name"
          className="h-[46px] w-full rounded-[8px] border border-white/[0.1] bg-white/[0.03] px-3.5 text-[14px] text-white placeholder:text-white/35 transition-colors focus:border-brand-yellow/60 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-email"
          className="text-[13px] font-medium leading-[18px] text-white/90"
        >
          Email address
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Enter your email"
          className="h-[46px] w-full rounded-[8px] border border-white/[0.1] bg-white/[0.03] px-3.5 text-[14px] text-white placeholder:text-white/35 transition-colors focus:border-brand-yellow/60 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-subject"
          className="text-[13px] font-medium leading-[18px] text-white/90"
        >
          Subject
        </label>
        <div className="relative">
          <select
            id="contact-subject"
            name="subject"
            required
            value={form.subject}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, subject: e.target.value }))
            }
            className={`h-[46px] w-full appearance-none rounded-[8px] border border-white/[0.1] bg-white/[0.03] px-3.5 pr-10 text-[14px] transition-colors focus:border-brand-yellow/60 focus:outline-none ${form.subject ? "text-white" : "text-white/35"
              }`}
          >
            <option value="" disabled className="bg-[#111] text-white/50">
              Choose a subject
            </option>
            {CONTACT_SUBJECTS.map((subject) => (
              <option
                key={subject}
                value={subject}
                className="bg-[#111] text-white"
              >
                {subject}
              </option>
            ))}
          </select>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="contact-message"
          className="text-[13px] font-medium leading-[18px] text-white/90"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Write us a message"
          className="w-full resize-none rounded-[8px] border border-white/[0.1] bg-white/[0.03] p-3.5 text-[14px] leading-[22px] text-white placeholder:text-white/35 transition-colors focus:border-brand-yellow/60 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-1 flex h-[48px] w-full items-center justify-center rounded-full bg-brand-yellow px-6 text-[15px] font-medium leading-[18px] tracking-[-0.02em] text-black shadow-[inset_0_2px_0_rgba(0,0,0,0.2)] transition-[transform,opacity] duration-150 hover:opacity-[0.88] active:scale-[0.98]"
      >
        Send message
      </button>
    </form>
  );
}
