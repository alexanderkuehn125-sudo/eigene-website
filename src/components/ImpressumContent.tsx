export function ImpressumContent() {
  return (
    <div className="max-w-3xl flex items-center justify-center h-full min-h-[200px] text-[15px] leading-relaxed opacity-90 md:text-base">
      <a 
        href="#" // TODO: Trage hier den Link zu deinem Impressum ein
        target="_blank" 
        rel="noreferrer"
        className="underline underline-offset-4 hover:text-[#C5A059] transition-colors"
      >
        Zum vollständigen Impressum
      </a>
    </div>
  );
}
