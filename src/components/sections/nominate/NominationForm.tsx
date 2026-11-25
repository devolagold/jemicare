"use client";

import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useRef,
  useState,
} from "react";
import {
  ACCEPTED_UPLOAD_TYPES,
  CIRCUMSTANCE_PROMPTS,
  MAX_UPLOAD_SIZE_BYTES,
  MAX_UPLOAD_SIZE_MB,
  NIGERIAN_STATE_LGAS,
  NOMINATOR_RELATIONSHIPS,
} from "@/data/nominate";
import { NIGERIAN_STATES } from "@/data/volunteer";
import { NominationSuccessModal } from "./NominationSuccessModal";

interface NominationFormState {
  widowFullName: string;
  widowPhone: string;
  state: string;
  lga: string;
  customLga: string;
  age: string;
  dependants: string;
  circumstances: string;
  nominatorName: string;
  nominatorPhone: string;
  relationship: string;
}

const INITIAL_STATE: NominationFormState = {
  widowFullName: "",
  widowPhone: "",
  state: "",
  lga: "",
  customLga: "",
  age: "",
  dependants: "",
  circumstances: "",
  nominatorName: "",
  nominatorPhone: "",
  relationship: "",
};

const ALLOWED_EXTENSIONS = new Set(["pdf", "mp4", "jpg", "jpeg", "png"]);

const INPUT_CLASS =
  "h-[46px] w-full rounded-[8px] border border-white/[0.1] bg-[#111114] px-3.5 text-[14px] text-white placeholder:text-white/35 transition-colors focus:border-brand-yellow/60 focus:outline-none";

const SELECT_BASE_CLASS =
  "h-[46px] w-full appearance-none rounded-[8px] border border-white/[0.1] bg-[#111114] px-3.5 pr-10 text-[14px] transition-colors focus:border-brand-yellow/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function SelectChevron() {
  return (
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
  );
}

export function NominationForm() {
  const [form, setForm] = useState<NominationFormState>(INITIAL_STATE);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const lgaOptions = form.state ? (NIGERIAN_STATE_LGAS[form.state] ?? ["Other"]) : [];

  const addFiles = (incomingList: FileList | null) => {
    if (!incomingList || incomingList.length === 0) return;

    const errors: string[] = [];
    const validFiles: File[] = [];

    Array.from(incomingList).forEach((file) => {
      const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED_EXTENSIONS.has(ext)) {
        errors.push(`"${file.name}" is not a supported format (PDF, MP4, JPG, PNG).`);
        return;
      }
      if (file.size > MAX_UPLOAD_SIZE_BYTES) {
        errors.push(`"${file.name}" exceeds the ${MAX_UPLOAD_SIZE_MB}MB maximum file size.`);
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
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setReferenceNumber(`JCF-NOM-${randomCode}`);
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
      {/* Part A: Nominee's Information */}
      <fieldset>
        <legend className="w-full border-b border-white/[0.08] pb-3.5 font-display text-[17px] font-semibold leading-[22px] tracking-[-0.01em] text-brand-yellow sm:text-[18px]">
          Part A: Nominee&apos;s Information
        </legend>

        <div className="mt-5 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="widow-full-name"
            className="text-[13px] font-medium leading-[18px] text-white/90"
          >
            Full Name of Widow
          </label>
          <input
            id="widow-full-name"
            name="widowFullName"
            type="text"
            required
            value={form.widowFullName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, widowFullName: e.target.value }))
            }
            placeholder="Please provide the widow's full name"
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="widow-phone"
            className="text-[13px] font-medium leading-[18px] text-white/90"
          >
            Phone Number
          </label>
          <input
            id="widow-phone"
            name="widowPhone"
            type="tel"
            required
            value={form.widowPhone}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, widowPhone: e.target.value }))
            }
            placeholder="0812 345 6789"
            className={INPUT_CLASS}
          />
          <p className="text-[12px] leading-[18px] text-white/45">
            If the nominee does not own a phone, provide a reliable contact
            number of a trusted relative or neighbour.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="widow-state"
              className="text-[13px] font-medium leading-[18px] text-white/90"
            >
              State of Residence
            </label>
            <div className="relative">
              <select
                id="widow-state"
                name="state"
                required
                value={form.state}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    state: e.target.value,
                    lga: "",
                    customLga: "",
                  }))
                }
                className={`${SELECT_BASE_CLASS} ${
                  form.state ? "text-white" : "text-white/35"
                }`}
              >
                <option value="" disabled className="bg-[#111] text-white/50">
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
              <SelectChevron />
            </div>
            <p className="text-[12px] leading-[18px] text-white/45">
              Support is available nationwide.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="widow-lga"
              className="text-[13px] font-medium leading-[18px] text-white/90"
            >
              City / Local Government Area
            </label>
            <div className="relative">
              <select
                id="widow-lga"
                name="lga"
                required
                disabled={!form.state}
                value={form.lga}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    lga: e.target.value,
                    customLga: e.target.value === "Other" ? prev.customLga : "",
                  }))
                }
                className={`${SELECT_BASE_CLASS} ${
                  form.lga ? "text-white" : "text-white/35"
                }`}
              >
                <option value="" disabled className="bg-[#111] text-white/50">
                  {form.state ? "Choose one" : "Choose state first"}
                </option>
                {lgaOptions.map((lga) => (
                  <option
                    key={lga}
                    value={lga}
                    className="bg-[#111] text-white"
                  >
                    {lga}
                  </option>
                ))}
              </select>
              <SelectChevron />
            </div>
            {form.lga === "Other" && (
              <input
                type="text"
                name="customLga"
                required
                aria-label="Specify City or Local Government Area"
                value={form.customLga}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, customLga: e.target.value }))
                }
                placeholder="Enter City / LGA name"
                className={`${INPUT_CLASS} mt-1`}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="widow-age"
              className="text-[13px] font-medium leading-[18px] text-white/90"
            >
              Age
            </label>
            <input
              id="widow-age"
              name="age"
              type="number"
              min={18}
              max={120}
              required
              value={form.age}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, age: e.target.value }))
              }
              placeholder="Enter a number"
              className={INPUT_CLASS}
            />
            <p className="text-[12px] leading-[18px] text-white/45">
              There is no age restriction &mdash; support is open to verified
              widows of all ages.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="widow-dependants"
              className="text-[13px] font-medium leading-[18px] text-white/90"
            >
              Number of Children / Dependants
            </label>
            <input
              id="widow-dependants"
              name="dependants"
              type="number"
              min={0}
              max={30}
              required
              value={form.dependants}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, dependants: e.target.value }))
              }
              placeholder="Enter a number"
              className={INPUT_CLASS}
            />
          </div>
        </div>
        </div>
      </fieldset>

      {/* Part B: About Her Circumstances */}
      <fieldset>
        <legend className="w-full border-b border-white/[0.08] pb-3.5 font-display text-[17px] font-semibold leading-[22px] tracking-[-0.01em] text-brand-yellow sm:text-[18px]">
          Part B: About Her Circumstances
        </legend>

        <div className="mt-5 flex flex-col gap-4">
        <p className="text-[14px] leading-[22px] text-white/90">
          Please describe her current situation, the challenges she faces, and
          how financial assistance from JemiCare Foundation could make a
          difference in her life.
        </p>

        <ul className="space-y-1.5 text-[13px] leading-[21px] text-white/80">
          {CIRCUMSTANCE_PROMPTS.map((prompt) => (
            <li key={prompt} className="flex items-start gap-2">
              <span
                aria-hidden="true"
                className="mt-[2px] text-[10px] text-white/75"
              >
                &#9656;
              </span>
              <span>
                <strong className="font-semibold text-white">
                  Key detail to include:
                </strong>{" "}
                {prompt}
              </span>
            </li>
          ))}
        </ul>

        <textarea
          id="widow-circumstances"
          name="circumstances"
          aria-label="About her circumstances"
          rows={5}
          required
          value={form.circumstances}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, circumstances: e.target.value }))
          }
          placeholder="Please describe her current situation, the challenges she faces and how financial assistance from Jemicare Foundation could make a difference in her life."
          className="mt-1 w-full resize-y rounded-[8px] border border-white/[0.1] bg-[#111114] p-3.5 text-[14px] leading-[22px] text-white placeholder:text-white/35 transition-colors focus:border-brand-yellow/60 focus:outline-none"
        />
        </div>
      </fieldset>

      {/* Part C: Your Information (Nominator) */}
      <fieldset>
        <legend className="w-full border-b border-white/[0.08] pb-3.5 font-display text-[17px] font-semibold leading-[22px] tracking-[-0.01em] text-brand-yellow sm:text-[18px]">
          Part C: Your Information (Nominator)
        </legend>

        <div className="mt-5 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="nominator-name"
            className="text-[13px] font-medium leading-[18px] text-white/90"
          >
            Your Full Name
          </label>
          <input
            id="nominator-name"
            name="nominatorName"
            type="text"
            required
            value={form.nominatorName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, nominatorName: e.target.value }))
            }
            placeholder="Please provide your full name"
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="nominator-phone"
            className="text-[13px] font-medium leading-[18px] text-white/90"
          >
            Your Phone Number
          </label>
          <input
            id="nominator-phone"
            name="nominatorPhone"
            type="tel"
            required
            value={form.nominatorPhone}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, nominatorPhone: e.target.value }))
            }
            placeholder="0812 345 6789"
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="nominator-relationship"
            className="text-[13px] font-medium leading-[18px] text-white/90"
          >
            Relationship to the Nominee
          </label>
          <div className="relative">
            <select
              id="nominator-relationship"
              name="relationship"
              required
              value={form.relationship}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, relationship: e.target.value }))
              }
              className={`${SELECT_BASE_CLASS} ${
                form.relationship ? "text-white" : "text-white/35"
              }`}
            >
              <option value="" disabled className="bg-[#111] text-white/50">
                e.g Family, Neighbour, Community Member
              </option>
              {NOMINATOR_RELATIONSHIPS.map((rel) => (
                <option key={rel} value={rel} className="bg-[#111] text-white">
                  {rel}
                </option>
              ))}
            </select>
            <SelectChevron />
          </div>
        </div>
        </div>
      </fieldset>

      {/* Part D: Help us verify her application. */}
      <fieldset>
        <legend className="w-full border-b border-white/[0.08] pb-3.5 font-display text-[17px] font-semibold leading-[22px] tracking-[-0.01em] text-brand-yellow sm:text-[18px]">
          Part D: Help us verify her application.
        </legend>

        <div className="mt-5 flex flex-col gap-5">
        <p className="text-[14px] leading-[22px] text-white/75">
          Please upload relevant documents that support the nomination. These
          may include evidence of her spouse&apos;s passing and information that
          helps us understand her financial circumstances.
        </p>

        {/* Dropzone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload supporting documents"
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
            accept={ACCEPTED_UPLOAD_TYPES}
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
            Upload Supporting Documents
          </p>
          <p className="mt-1 text-[12px] leading-[18px] text-white/45">
            Accepted formats: PDF, MP4, JPG and PNG.
            <br />
            Maximum file size: {MAX_UPLOAD_SIZE_MB}mb
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
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
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

        <p className="text-[12px] leading-[19px] text-white/50">
          Examples of supporting proof include a death certificate, burial
          programme, affidavit of bereavement, a signed endorsement letter from
          a community or religious leader, or documents showing household
          financial circumstances.
        </p>

        <div className="mt-2 flex flex-col gap-4">
          <button
            type="submit"
            className="flex h-[50px] w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-[15px] font-medium leading-[18px] tracking-[-0.02em] text-black shadow-[inset_0_2px_0_rgba(0,0,0,0.2)] transition-[transform,opacity] duration-150 hover:opacity-[0.88] active:scale-[0.98]"
          >
            Submit Nomination
            <img
              className="h-[12px] w-[14px]"
              src="/assets/arrow-dark.svg"
              alt=""
            />
          </button>

          <p className="flex items-start gap-2 text-[12px] leading-[18px] text-white/45">
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
              className="mt-[2px] shrink-0 text-white/55"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span>
              Nominating someone is completely free. JemiCare Foundation does
              not charge any fee for submitting or reviewing nominations.
            </span>
          </p>
        </div>
        </div>
      </fieldset>
    </form>

    <NominationSuccessModal
      isOpen={modalOpen}
      referenceNumber={referenceNumber}
      onClose={handleCloseModal}
    />
    </>
  );
}
