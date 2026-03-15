import { useState } from 'react'

const riskConfig = {
  critical: {
    label: 'CRITICAL',
    classes: 'text-red-400 border-red-400/30 bg-red-400/5',
  },
  high: {
    label: 'HIGH',
    classes: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  },
  medium: {
    label: 'MEDIUM',
    classes: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  },
  low: {
    label: 'LOW',
    classes: 'text-green-400 border-green-400/30 bg-green-400/5',
  },
}

export default function AttackCard({ attack, layerColor }) {
  const [showDefenses, setShowDefenses] = useState(false)
  const risk = riskConfig[attack.risk] ?? riskConfig.medium
  const hasDefenses = attack.defenses && attack.defenses.length > 0

  return (
    <div
      className="group relative bg-dark-800 border border-dark-600 rounded-md p-4 transition-all duration-200 hover:border-dark-500 hover:bg-dark-700"
    >
      {/* Top row — name + risk badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5"
            style={{ backgroundColor: layerColor }}
          />
          <h3 className="font-sans font-bold text-sm text-white leading-tight">
            {attack.name}
          </h3>
        </div>
        <div className="relative group/tooltip flex-shrink-0">
          <span className={`font-mono text-xs px-2 py-0.5 rounded border cursor-help ${risk.classes}`}>
            {risk.label}
          </span>
          <div className="absolute right-0 top-7 z-50 w-48 p-2.5 rounded bg-dark-600 border border-dark-500 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-200 pointer-events-none">
            <p className="font-mono text-xs text-gray-400 leading-relaxed">
              <span className="text-white">Risk Level</span> reflects exploitability and potential impact combined.
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="font-mono text-xs text-gray-500 leading-relaxed">
        {attack.description}
      </p>

      {/* Toggle button — only renders if defenses exist */}
      {hasDefenses && (
        <button
          onClick={() => setShowDefenses(!showDefenses)}
          className="mt-3 font-mono text-xs transition-colors duration-150 flex items-center gap-1.5"
          style={{ color: showDefenses ? layerColor : '#5a6890' }}
        >
          <span className="transition-transform duration-200"
            style={{ display: 'inline-block', transform: showDefenses ? 'rotate(90deg)' : 'rotate(0deg)' }}
          >
            ▸
          </span>
          {showDefenses ? 'Hide mitigations' : 'Show mitigations'}
        </button>
      )}

      {/* Per-attack defenses — toggled */}
      {hasDefenses && showDefenses && (
        <div className="mt-3 pt-3 border-t border-dark-600">
          <ul className="flex flex-wrap gap-1.5">
            {attack.defenses.map((defense) => (
              <li
                key={defense}
                className="font-mono text-xs text-green-400/70 bg-green-400/5 border border-green-400/20 px-2 py-0.5 rounded"
              >
                {defense}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}