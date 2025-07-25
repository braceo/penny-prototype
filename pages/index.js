import { useState } from 'react'

export default function Home() {
  const [query, setQuery] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const askPenny = async () => {
    if (!query) return
    setLoading(true)
    setAnswer('')
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      })
      const data = await res.json()
      setAnswer(data.answer)
    } catch (err) {
      setAnswer('Something went wrong. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-white text-black p-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Penny 🪙</h1>
      <input
        type="text"
        placeholder="Ask me anything..."
        className="border border-gray-300 rounded px-4 py-2 w-full max-w-md mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && askPenny()}
      />
      <button
        onClick={askPenny}
        className="bg-black text-white px-4 py-2 rounded mb-4"
      >
        {loading ? 'Thinking...' : 'Ask Penny'}
      </button>
      <div className="max-w-md whitespace-pre-wrap text-left">{answer}</div>
    </div>
  )
}