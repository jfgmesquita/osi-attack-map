export default function DefenseList({ defenses }) {
  if (!defenses || defenses.length === 0) return null

  return (
    <div className="mt-4 pt-4 border-t border-dark-600">
      <p className="font-mono text-xs tracking-widest text-green-500/70 uppercase mb-3">
        ▸ Layer Defenses
      </p>
      <ul className="flex flex-wrap gap-2">
        {defenses.map((defense) => (
          <li
            key={defense}
            className="font-mono text-xs text-green-400/70 bg-green-400/5 border border-green-400/20 px-3 py-1 rounded-sm transition-colors duration-150 hover:bg-green-400/10 hover:text-green-300"
          >
            {defense}
          </li>
        ))}
      </ul>
    </div>
  )
}