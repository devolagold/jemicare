"use client";

import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useRef,
  useState,
} from "react";
import {
  TESTIMONY_ACCEPTED_UPLOAD_TYPES,
  TESTIMONY_MAX_UPLOAD_BYTES,
  TESTIMONY_MAX_UPLOAD_MB,
  TESTIMONY_PERMISSION_OPTIONS,
} from "@/data/testimony";
import { NIGERIAN_STATES } from "@/data/volunteer";
import { TestimonySuccessModal } from "./TestimonySuccessModal";

interface TestimonyFormState {
  fullName: string;
  phone: string;
  state: string;
  supportDate: string;
  experience: string;
  impact: string;
  messageToOthers: string;
  permission: "public" | "private";
}

const INITIAL_STATE: TestimonyFormState = {
  fullName: "",
  phone: "",
  state: "",
  supportDate: "",
  experience: "",
  impact: "",
  messageToOthers: "",
  permission: "private",
};

const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "mp4"]);

const INPUT_CLASS =
  "h-[46px] w-full rounded-[8px] border border-white/[0.1] bg-[#111114] px-3.5 text-[14px] text-white placeholder:text-white/35 transition-colors focus:border-brand-yellow/60 focus:outline-none";

const TEXTAREA_CLASS =
  "w-full resize-y rounded-[8px] border border-white/[0.1] bg-[#111114] p-3.5 text-[14px] leading-[22px] text-white placeholder:text-white/35 transition-colors focus:border-brand-yellow/60 focus:outline-none";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function TestimonyForm() {
  const [form, setForm] = useState<TestimonyFormState>(INITIAL_STATE);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incomingList: FileList | null) => {
    if (!incomingList || incomingList.length === 0) return;

    const errors: string[] = [];
    const validFiles: File[] = [];

    Array.from(incomingList).forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        errors.push(`"${file.name}" is not a supported format (JPG, PNG, MP4).`);
        return;
      }
      if (file.size > TESTIMONY_MAX_UPLOAD_BYTES) {
        errors.push(
          `"${file.name}" exceeds the ${TESTIMONY_MAX_UPLOAD_MB}MB maximum file size.`,
        );
        return;
      }
      validFiles.push(file);
    });

    setFileError(errors.length > 0 ? errors[0] : null);

    if (validFiles.length > 0) {
      setFiles((prev) => {
        const existingKeys = new Set(prev.map((f) => `${f.name}-${f.size}`));
        const uniqueIncoming = validFiles.filter(
          (f) => !existingKeys.has(`${f.name}-${f.size}`),
        );
        return [...prev, ...uniqueIncoming];
      });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = "";
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== index));
    setFileError(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setForm(INITIAL_STATE);
    setFiles([]);
    setFileError(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-12 sm:gap-14">
        {/* Part A: Your Information */}
        <fieldset>
          <legend className="w-full border-b border-white/[0.08] pb-3.5 font-display text-[17px] font-semibold leading-[22px] tracking-[-0.01em] text-brand-yellow sm:text-[18px]">
            Part A: Your Information
          </legend>

          <div className="mt-5 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="testimony-full-name"
                className="text-[13px] font-medium leading-[18px] text-white/90"
              >
                Full Name
              </label>
              <input
                id="testimony-full-name"
                name="fullName"
                type="text"
                required
                value={form.fullName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, fullName: e.target.value }))
                }
                placeholder="Please provide your full name"
                className={INPUT_CLASS}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="testimony-phone"
                className="text-[13px] font-medium leading-[18px] text-white/90"
              >
                Phone Number
              </label>
              <input
                id="testimony-phone"
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

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="testimony-state"
                  className="text-[13px] font-medium leading-[18px] text-white/90"
                >
                  State of Residence
                </label>
                <div className="relative">
                  <select
                    id="testimony-state"
                    name="state"
                    required
                    value={form.state}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, state: e.target.value }))
                    }
                    className={`h-[46px] w-full appearance-none rounded-[8px] border border-white/[0.1] bg-[#111114] px-3.5 pr-10 text-[14px] transition-colors focus:border-brand-yellow/60 focus:outline-none ${
                      form.state ? "text-white" : "text-white/35"
                    }`}
                  >
                    <option
                      value=""
                      disabled
                      className="bg-[#111] text-white/50"
                    >
                      Choose one
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
                  htmlFor="testimony-support-date"
                  className="text-[13px] font-medium leading-[18px] text-white/90"
                >
                  When did you receive support?
                </label>
                <input
                  id="testimony-support-date"
                  name="supportDate"
                  type="date"
                  required
                  value={form.supportDate}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      supportDate: e.target.value,
                    }))
                  }
                  className={`${INPUT_CLASS} [color-scheme:dark] ${
                    form.supportDate ? "text-white" : "text-white/35"
                  }`}
                />
                <p className="text-[12px] leading-[18px] text-white/45">
                  Provide the approximate date or month you received assistance.
                </p>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Part B: Your Testimony */}
        <fieldset>
          <legend className="w-full border-b border-white/[0.08] pb-3.5 font-display text-[17px] font-semibold leading-[22px] tracking-[-0.01em] text-brand-yellow sm:text-[18px]">
            Part B: Your Testimony
          </legend>

          <div className="mt-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="testimony-experience"
                className="text-[13px] font-medium leading-[18px] text-white/90"
              >
                Tell us about your experience with Jemicare Foundation.
              </label>
              <textarea
                id="testimony-experience"
                name="experience"
                rows={4}
                required
                value={form.experience}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, experience: e.target.value }))
                }
                placeholder="How did you hear about us, and what was your experience like?"
                className={TEXTAREA_CLASS}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="testimony-impact"
                className="text-[13px] font-medium leading-[18px] text-white/90"
              >
                How did the support you received make a difference in your life?
              </label>
              <textarea
                id="testimony-impact"
                name="impact"
                rows={4}
                required
                value={form.impact}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, impact: e.target.value }))
                }
                placeholder="Tell us about any positive changes or opportunities the assistance has brought to you or your family."
                className={TEXTAREA_CLASS}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="testimony-others"
                className="text-[13px] font-medium leading-[18px] text-white/90"
              >
                What would you like others to know about your experience?
              </label>
              <textarea
                id="testimony-others"
                name="messageToOthers"
                rows={4}
                value={form.messageToOthers}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    messageToOthers: e.target.value,
                  }))
                }
                placeholder="Feel free to share a message of encouragement, appreciation or anything else you would like people to know."
                className={TEXTAREA_CLASS}
              />
            </div>
          </div>
        </fieldset>

        {/* Part C: Upload Your Media */}
        <fieldset>
          <legend className="w-full border-b border-white/[0.08] pb-3.5 font-display text-[17px] font-semibold leading-[22px] tracking-[-0.01em] text-brand-yellow sm:text-[18px]">
            Part C: Upload Your Media
          </legend>

          <div className="mt-5 flex flex-col gap-5">
            <p className="text-[14px] leading-[22px] text-white/75">
              You can upload pictures or videos that help tell your story.
              Please ensure that any other individuals appearing in your media
              have given permission for their images to be submitted.
            </p>

            <div
              role="button"
              tabIndex={0}
              aria-label="Upload photos or videos"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-[14px] border px-6 py-10 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow ${
                isDragging
                  ? "border-brand-yellow bg-brand-yellow/[0.06]"
                  : "border-white/[0.1] bg-[#0e0e11] [background-image:repeating-linear-gradient(-45deg,rgba(255,255,255,0.02)_0px,rgba(255,255,255,0.02)_4px,transparent_4px,transparent_10px)] hover:border-white/25"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={TESTIMONY_ACCEPTED_UPLOAD_TYPES}
                onChange={handleFileChange}
                className="hidden"
              />

              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.08] text-white">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 13v8" />
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="m8 17 4-4 4 4" />
                </svg>
              </span>

              <p className="mt-3.5 text-[14px] font-semibold text-white">
                Upload Photos or Videos
              </p>
              <p className="mt-1 text-[12px] leading-[18px] text-white/45">
                Accepted formats: JPG, PNG and MP4.
                <br />
                Maximum file size: {TESTIMONY_MAX_UPLOAD_MB}mb.
              </p>
            </div>

            {fileError && (
              <p className="text-[12px] leading-[18px] text-red-400" role="alert">
                {fileError}
              </p>
            )}

            {files.length > 0 && (
              <ul className="flex flex-col gap-2">
                {files.map((file, index) => (
                  <li
                    key={`${file.name}-${file.size}`}
                    className="flex items-center justify-between gap-3 rounded-[10px] border border-white/[0.08] bg-[#141418] px-3.5 py-2.5 text-[13px]"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] bg-brand-yellow/15 text-brand-yellow">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                        </svg>
                      </span>
                      <span className="truncate font-medium text-white">
                        {file.name}
                      </span>
                      <span className="shrink-0 text-[12px] text-white/45">
                        {formatBytes(file.size)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      aria-label={`Remove ${file.name}`}
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </fieldset>

        {/* Part D: Permission to Share */}
        <fieldset>
          <legend className="w-full border-b border-white/[0.08] pb-3.5 font-display text-[17px] font-semibold leading-[22px] tracking-[-0.01em] text-brand-yellow sm:text-[18px]">
            Part D: Permission to Share
          </legend>

          <div className="mt-5 flex flex-col gap-5">
            <p className="text-[14px] leading-[22px] text-white/75">
              We respect your privacy and understand that not everyone wants
              their personal story shared publicly. Please let us know your
              preference.
            </p>

            <div className="flex flex-col gap-3.5">
              <p className="text-[13px] font-semibold leading-[18px] text-white">
                Choose an option:
              </p>

              <div className="flex flex-col gap-4">
                {TESTIMONY_PERMISSION_OPTIONS.map((option) => {
                  const selected = form.permission === option.value;

                  return (
                    <label
                      key={option.value}
                      className="flex cursor-pointer items-start gap-3.5"
                    >
                      <input
                        type="radio"
                        name="permission"
                        value={option.value}
                        checked={selected}
                        onChange={() =>
                          setForm((prev) => ({
                            ...prev,
                            permission: option.value,
                          }))
                        }
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          selected
                            ? "border-brand-yellow bg-brand-yellow/15"
                            : "border-white/25 bg-white/10"
                        }`}
                      >
                        {selected && (
                          <span className="h-[8px] w-[8px] rounded-full bg-brand-yellow" />
                        )}
                      </span>
                      <span className="text-[13px] leading-[20px] text-white/70 sm:text-[14px] sm:leading-[21px]">
                        <strong className="font-semibold text-white">
                          {option.title}
                        </strong>{" "}
                        {option.description}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <p className="text-[12px] leading-[19px] text-white/50">
              Beneficiary testimonies are lightly reviewed for spelling,
              grammar, and clarity only, preserving the authentic voice and
              message of the author.
            </p>

            <button
              type="submit"
              className="mt-2 flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-[15px] font-medium leading-[18px] tracking-[-0.02em] text-black shadow-[inset_0_2px_0_rgba(0,0,0,0.2)] transition-[transform,opacity] duration-150 hover:opacity-[0.88] active:scale-[0.98]"
            >
              Submit my Testimony
              <img
                className="h-[12px] w-[14px]"
                src="/assets/arrow-dark.svg"
                alt=""
              />
            </button>
          </div>
        </fieldset>
      </form>

      <TestimonySuccessModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
