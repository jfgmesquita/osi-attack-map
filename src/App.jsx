import { layers } from './data/layers'
import LayerCard from './components/LayerCard'
import Header from './components/Header'

export default function App() {
  return (
    <div className="relative min-h-screen bg-dark-900">

      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26,34,64,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,34,64,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">

        <Header />

        {/* OSI Stack — rendered 7 to 1 */}
        <div className="flex flex-col gap-2">
          {[...layers].reverse().map((layer) => (
            <LayerCard
              key={layer.id}
              layer={layer}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-dark-600">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-gray-600">
                // OSI Attack Map — open source security reference
              </p>
              <p className="font-mono text-xs text-gray-700 mt-1">
                Information is provided for educational purposes only.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/jfgmesquita/osi-attack-map"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-gray-600 hover:text-gray-400 transition-colors duration-150"
              >
                GitHub →
              </a>
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}