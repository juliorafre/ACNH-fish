export default function Loading() {
  return (
    <div className="min-h-screen bg-fish-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-bounce text-6xl mb-4">🐠</div>
        <p className="text-fish-text-primary font-semibold text-xl">Loading fish data...</p>
        <p className="text-fish-text-small text-sm mt-2">Casting the line...</p>
      </div>
    </div>
  )
}
