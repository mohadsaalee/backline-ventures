export default function ContactImage() {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-full rounded-2xl overflow-hidden bg-ink border border-line">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/backline-image-3.avif"
        alt="BACKLINE VENTURES"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover grayscale contrast-125 brightness-[0.7]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
    </div>
  );
}