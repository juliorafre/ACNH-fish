'use client'

import { useEffect } from 'react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-fish-background p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🐠</div>
        <h2 className="text-2xl font-bold text-fish-text-primary mb-2">
          Something went wrong!
        </h2>
        <p className="text-fish-text-small mb-6">
          We encountered an error while trying to catch this fish. Don't worry, you can try again!
        </p>
        <button
          onClick={reset}
          className="bg-fish-accent-cian text-fish-text-primary font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
