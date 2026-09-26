"use client";

import { useState } from "react";

const assetOptions = [
  "Manufacturing",
  "Product",
  "Customers",
  "Distribution",
  "Capital",
  "Technology",
  "Brand",
  "Other",
];

const opportunityOptions = [
  "New venture",
  "New brand",
  "New product",
  "New market",
  "New channel",
  "New business model",
  "Not sure yet",
];

export default function ContactForm() {
  const [assets, setAssets] = useState<string[]>([]);
  const [opportunity, setOpportunity] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  function toggleAsset(a: string) {
    setAssets((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-line bg-card p-10 md:p-14 text-center">
        <p className="font-display text-2xl md:text-3xl">
          Thank you.
        </p>
        <p className="mt-4 text-ink-soft leading-relaxed max-w-sm mx-auto">
          We&apos;ve received what you&apos;ve shared. We&apos;ll be in touch
          to start the conversation.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-transparent border-0 border-b border-line pb-3 pt-2 text-ink placeholder:text-ink-faint focus:outline-none focus:border-ink transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
        <div>
          <label className="eyebrow block mb-2">Name</label>
          <input required name="name" type="text" className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Company</label>
          <input required name="company" type="text" className={inputClass} placeholder="Company name" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Role</label>
          <input name="role" type="text" className={inputClass} placeholder="Your role" />
        </div>
        <div>
          <label className="eyebrow block mb-2">Email</label>
          <input required name="email" type="email" className={inputClass} placeholder="you@company.com" />
        </div>
        <div className="sm:col-span-2">
          <label className="eyebrow block mb-2">Phone</label>
          <input name="phone" type="tel" className={inputClass} placeholder="Optional" />
        </div>
      </div>

      <div>
        <label className="eyebrow block mb-2">
          What does your business currently do?
        </label>
        <textarea
          name="businessDescription"
          rows={3}
          className={inputClass + " resize-none"}
          placeholder="A brief description of your business"
        />
      </div>

      {/* <div>
        <label className="eyebrow block mb-3">
          What assets or capabilities do you have?
        </label>
        <div className="flex flex-wrap gap-2">
          {assetOptions.map((a) => (
            <button
              type="button"
              key={a}
              onClick={() => toggleAsset(a)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                assets.includes(a)
                  ? "bg-ink text-bg border-ink"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div> */}

      {/* <div>
        <label className="eyebrow block mb-3">
          What opportunity are you exploring?
        </label>
        <div className="flex flex-wrap gap-2">
          {opportunityOptions.map((o) => (
            <button
              type="button"
              key={o}
              onClick={() => setOpportunity(o)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                opportunity === o
                  ? "bg-ink text-bg border-ink"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div> */}

      <div>
        <label className="eyebrow block mb-2">Tell us about the opportunity.</label>
        <textarea
          name="message"
          rows={4}
          className={inputClass + " resize-none"}
          placeholder="Share as much or as little as you'd like"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-8 py-3.5 text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        Start a conversation
      </button>
    </form>
  );
}
