export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--retro-border)] bg-[var(--retro-surface)] py-8 mt-16 pb-24">
      <div className="container mx-auto px-4 text-center flex flex-col items-center gap-4">
        <p className="text-sm text-[var(--retro-text)] opacity-70">
          NetNostalgia © {new Date().getFullYear()}
        </p>
        <p className="text-xs font-mono bg-[var(--retro-bg)] px-3 py-1 border border-[var(--retro-border)] inline-block">
          Optimized for 1024x768 resolution
        </p>
      </div>
    </footer>
  );
}
