"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import {
  NIGERIAN_STATES,
  VOLUNTEER_AVAILABILITY,
  VOLUNTEER_SKILLS,
} from "@/data/volunteer";

interface VolunteerFormState {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  skills: string[];
  availability: string;
  bio: string;
}

const INITIAL_STATE: VolunteerFormState = {
  fullName: "",
  email: "",
  phone: "",
  state: "",
  skills: [],
  availability: "",
  bio: "",
};

const INPUT_CLASS =
  "h-[46px] w-full rounded-[8px] border border-white/[0.1] bg-white/[0.03] px-3.5 text-[14px] text-white placeholder:text-white/35 transition-colors focus:border-brand-yellow/60 focus:outline-none";

export function VolunteerForm() {
  const [form, setForm] = useState<VolunteerFormState>(INITIAL_STATE);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const [skillsError, setSkillsError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skillsOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setSkillsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSkillsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [skillsOpen]);

  const toggleSkill = (skill: string) => {
    setForm((prev) => {
      const exists = prev.skills.includes(skill);
      const nextSkills = exists
        ? prev.skills.filter((item) => item !== skill)
        : [...prev.skills, skill];
      if (nextSkills.length > 0) setSkillsError(false);
      return { ...prev, skills: nextSkills };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.skills.length === 0) {
      setSkillsError(true);
      setSkillsOpen(true);
      return;
    }
    setSkillsError(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="volunteer-form-card flex flex-col items-center justify-center rounded-[20px] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(19,19,22,0.8)_0%,rgba(19,19,22,0.05)_100%)] px-6 py-14 text-center sm:px-8 sm:py-16">
        <span>
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M69.3845 52.1717C73.0475 56.9862 72.6816 63.8873 68.2844 68.2844C63.8873 72.6815 56.9862 73.0475 52.1717 69.3845C51.3565 75.3794 46.2184 80 40 80C33.7816 80 28.6436 75.3793 27.8283 69.3845C23.0137 73.0475 16.1127 72.6816 11.7156 68.2844C7.31851 63.8872 6.95252 56.9862 10.6155 52.1717C4.62058 51.3566 0 46.2185 0 40C0 33.7816 4.62068 28.6436 10.6155 27.8283C6.95252 23.0138 7.31842 16.1127 11.7156 11.7156C16.1127 7.31851 23.0138 6.95252 27.8283 10.6155C28.6435 4.62058 33.7816 0 40 0C46.2184 0 51.3564 4.62068 52.1717 10.6155C56.9863 6.95252 63.8873 7.31841 68.2844 11.7156C72.6815 16.1128 73.0475 23.0138 69.3845 27.8283C75.3794 28.6435 80 33.7816 80 40C80 46.2185 75.3793 51.3565 69.3845 52.1717Z"
              fill="#EDB01A"
            />
            <path
              d="M39.9993 53.3334C47.3631 53.3334 53.3327 47.3638 53.3327 40C53.3327 32.6362 47.3631 26.6667 39.9993 26.6667C32.6355 26.6667 26.666 32.6362 26.666 40C26.666 47.3638 32.6355 53.3334 39.9993 53.3334ZM47.2755 36.6095L38.666 45.219L33.0565 39.6095L34.9422 37.7239L38.666 41.4478L45.3899 34.7239L47.2755 36.6095Z"
              fill="white"
            />
          </svg>
        </span>
        <h2 className="mt-5 font-display text-[24px] font-bold leading-[28px] tracking-[-0.02em] text-white">
          Application received
        </h2>
        <p className="mt-2.5 max-w-[340px] text-[15px] leading-[22px] text-brand-grey-light">
          Thank you, {form.fullName || "friend"}. We&apos;re excited about your
          interest in volunteering — our team will reach out to you shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(INITIAL_STATE);
            setSubmitted(false);
          }}
          className="mt-7 flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-[14px] font-medium leading-[18px] tracking-[-0.02em] text-black shadow-[inset_0_2px_0_rgba(0,0,0,0.2)] transition-[transform,opacity] duration-150 hover:opacity-[0.88] active:scale-[0.98]"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="volunteer-form-card flex flex-col gap-5 rounded-[20px] border border-white/[0.04] bg-[linear-gradient(180deg,rgba(19,19,22,0.8)_0%,rgba(19,19,22,0.05)_100%)] p-6 sm:p-8"
    >
      {/* Full Name */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="volunteer-full-name"
          className="text-[13px] font-medium leading-[18px] text-white/90"
        >
          Full Name
        </label>
        <input
          id="volunteer-full-name"
          name="fullName"
          type="text"
          required
          value={form.fullName}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, fullName: e.target.value }))
          }
          placeholder="Please enter your full name"
          className={INPUT_CLASS}
        />
      </div>

      {/* Email Address + Phone Number */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="volunteer-email"
            className="text-[13px] font-medium leading-[18px] text-white/90"
          >
            Email Address
          </label>
          <input
            id="volunteer-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="you@example.com"
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="volunteer-phone"
            className="text-[13px] font-medium leading-[18px] text-white/90"
          >
            Phone Number
          </label>
          <input
            id="volunteer-phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="0812 345 6789"
            className={INPUT_CLASS}
          />
        </div>
      </div>

      {/* State / City + Availability */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="volunteer-state"
            className="text-[13px] font-medium leading-[18px] text-white/90"
          >
            State / City
          </label>
          <div className="relative">
            <select
              id="volunteer-state"
              name="state"
              required
              value={form.state}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, state: e.target.value }))
              }
              className={`h-[46px] w-full appearance-none rounded-[8px] border border-white/[0.1] bg-white/[0.03] px-3.5 pr-10 text-[14px] transition-colors focus:border-brand-yellow/60 focus:outline-none ${
                form.state ? "text-white" : "text-white/35"
              }`}
            >
              <option value="" disabled className="bg-[#111] text-white/50">
                Select your state
              </option>
              {NIGERIAN_STATES.map((state) => (
                <option
                  key={state}
                  value={state}
                  className="bg-[#111] text-white"
                >
                  {state}
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
            htmlFor="volunteer-availability"
            className="text-[13px] font-medium leading-[18px] text-white/90"
          >
            Availability
          </label>
          <div className="relative">
            <select
              id="volunteer-availability"
              name="availability"
              required
              value={form.availability}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, availability: e.target.value }))
              }
              className={`h-[46px] w-full appearance-none rounded-[8px] border border-white/[0.1] bg-white/[0.03] px-3.5 pr-10 text-[14px] transition-colors focus:border-brand-yellow/60 focus:outline-none ${
                form.availability ? "text-white" : "text-white/35"
              }`}
            >
              <option value="" disabled className="bg-[#111] text-white/50">
                Select availability
              </option>
              {VOLUNTEER_AVAILABILITY.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-[#111] text-white"
                >
                  {option}
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
      </div>

      {/* Primary Skills / Interest Areas (Multi-select Dropdown) */}
      <div ref={dropdownRef} className="relative flex flex-col gap-2">
        <label
          id="volunteer-skills-label"
          className="text-[13px] font-medium leading-[18px] text-white/90"
        >
          Primary Skills / Interest Areas
        </label>

        <button
          type="button"
          aria-labelledby="volunteer-skills-label"
          aria-expanded={skillsOpen}
          aria-haspopup="listbox"
          onClick={() => setSkillsOpen((prev) => !prev)}
          className={`flex min-h-[46px] w-full items-center justify-between gap-2 rounded-[8px] border bg-white/[0.03] px-3.5 py-2 text-left text-[14px] transition-colors focus:border-brand-yellow/60 focus:outline-none ${
            skillsError
              ? "border-red-400/70"
              : skillsOpen
                ? "border-brand-yellow/60"
                : "border-white/[0.1]"
          }`}
        >
          <span className="flex flex-1 flex-wrap items-center gap-1.5">
            {form.skills.length === 0 ? (
              <span className="text-white/35">Select one or more areas</span>
            ) : (
              form.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 rounded-full bg-brand-yellow/15 px-2.5 py-0.5 text-[12px] font-medium text-brand-yellow"
                >
                  {skill}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Remove ${skill}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSkill(skill);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleSkill(skill);
                      }
                    }}
                    className="ml-0.5 cursor-pointer text-brand-yellow/80 hover:text-white"
                  >
                    ×
                  </span>
                </span>
              ))
            )}
          </span>
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
            className={`shrink-0 text-white/50 transition-transform duration-200 ${
              skillsOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {skillsOpen && (
          <ul
            role="listbox"
            aria-multiselectable="true"
            aria-labelledby="volunteer-skills-label"
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-[240px] overflow-y-auto rounded-[10px] border border-white/15 bg-[#141418] p-1.5 shadow-2xl"
          >
            {VOLUNTEER_SKILLS.map((skill) => {
              const checked = form.skills.includes(skill);
              return (
                <li key={skill} role="option" aria-selected={checked}>
                  <button
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`flex w-full items-center gap-2.5 rounded-[7px] px-3 py-2 text-[14px] transition-colors ${
                      checked
                        ? "bg-brand-yellow/15 text-white"
                        : "text-white/80 hover:bg-white/[0.06]"
                    }`}
                  >
                    <span
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border transition-colors ${
                        checked
                          ? "border-brand-yellow bg-brand-yellow text-black"
                          : "border-white/30"
                      }`}
                    >
                      {checked && (
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                    {skill}
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {skillsError && (
          <p className="text-[12px] text-red-400">
            Please select at least one skill or interest area.
          </p>
        )}
      </div>

      {/* Brief Bio / Motivation (Optional) */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="volunteer-bio"
          className="text-[13px] font-medium leading-[18px] text-white/90"
        >
          Brief Bio / Motivation{" "}
          <span className="font-normal text-white/40">(Optional)</span>
        </label>
        <textarea
          id="volunteer-bio"
          name="bio"
          rows={4}
          value={form.bio}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, bio: e.target.value }))
          }
          placeholder="Tell us a little about your background, skills, or why you want to volunteer with JemiCare Foundation..."
          className="w-full resize-none rounded-[8px] border border-white/[0.1] bg-white/[0.03] p-3.5 text-[14px] leading-[22px] text-white placeholder:text-white/35 transition-colors focus:border-brand-yellow/60 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="mt-1 flex h-[48px] w-full items-center justify-center rounded-full bg-brand-yellow px-6 text-[15px] font-medium leading-[18px] tracking-[-0.02em] text-black shadow-[inset_0_2px_0_rgba(0,0,0,0.2)] transition-[transform,opacity] duration-150 hover:opacity-[0.88] active:scale-[0.98]"
      >
        Join Our Volunteer Team
      </button>
    </form>
  );
}
