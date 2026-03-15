import { useState } from 'react'
import AttackCard from './AttackCard'
import DefenseList from './DefenseList'

export default function LayerCard({ layer }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className="relative border rounded-md overflow-hidden transition-all duration-200"
      style={{
        borderColor: isOpen ? layer.color : '#1a2240',
        backgroundColor: isOpen ? '#0b1020' : '#090d1a',
      }}
    >
      {/* Scan line animation when open */}
      {isOpen && (
        <div
          className="absolute inset-x-0 h-px opacity-20 pointer-events-none animate-scan"
          style={{ background: `linear-gradient(90deg, transparent, ${layer.color}, transparent)` }}
        />
      )}

      {/* Header row — always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left"
        aria-expanded={isOpen}
        aria-controls={`layer-body-${layer.id}`}
      >
        <div className="grid items-center gap-4 p-4 md:p-5"
          style={{ gridTemplateColumns: '52px 1fr auto' }}
        >
          {/* Layer number */}
          <span
            className="font-mono text-2xl font-bold text-center leading-none"
            style={{ color: layer.color }}
          >
            {layer.num}
          </span>

          {/* Layer name + protocols */}
          <div className="min-w-0">
            <h2 className="font-sans font-bold text-base text-white">
              {layer.name}
            </h2>
            <p className="font-mono text-xs text-gray-600 mt-0.5 truncate">
              {layer.protocols.join(' · ')}
            </p>
          </div>

          {/* Right side — attack count + chevron */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <span
              className="hidden md:block font-mono text-xs px-2 py-1 rounded border"
              style={{
                color: layer.color,
                borderColor: `${layer.color}40`,
                backgroundColor: `${layer.color}10`,
              }}
            >
              {layer.attacks.length} attacks
            </span>
            <span
              className="font-mono text-xs transition-transform duration-200"
              style={{
                color: isOpen ? layer.color : '#5a6890',
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            >
              ▼
            </span>
          </div>
        </div>
      </button>

      {/* Expandable body */}
      {isOpen && (
        <div
          id={`layer-body-${layer.id}`}
          className="border-t border-dark-600 px-4 md:px-5 pb-5"
        >
          {/* Layer description */}
          <p className="font-mono text-xs text-gray-500 leading-relaxed mt-4 mb-5 pb-4 border-b border-dark-600">
            {layer.description}
          </p>

          {/* Attack count label */}
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3 opacity-70"
            style={{ color: layer.color }}
          >
            // {layer.attacks.length} major attack vectors
          </p>

          {/* Attack cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {layer.attacks.map((attack) => (
              <AttackCard
                key={attack.id}
                attack={attack}
                layerColor={layer.color}
              />
            ))}
          </div>

          {/* Layer-wide defenses */}
          <DefenseList defenses={layer.defenses} />
        </div>
      )}
    </div>
  )
}