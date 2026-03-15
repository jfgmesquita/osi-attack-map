export default function Header() {
  return (
    <header className="relative z-10 mb-12 border-l-2 border-layer-session pl-6">
      <p className="font-mono text-xs tracking-widest text-layer-session uppercase mb-3 opacity-80">
        // Cybersecurity • Network Security • Defense in Depth • Zero Trust
      </p>
      <h1 className="font-sans font-extrabold text-4xl md:text-5xl text-white leading-tight tracking-tight">
        OSI Attack <span className="text-layer-session">Map</span>
      </h1>
      <p className="mt-4 font-mono text-sm text-gray-500 max-w-xl leading-relaxed">
        Every OSI Model layer. Every major attack vector. Every major defense.
        <br />
        From the cable to the browser — what can go wrong and how to stop it.
      </p>
    </header>
  )
}