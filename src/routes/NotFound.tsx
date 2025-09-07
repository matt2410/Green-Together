export default function NotFound(){
  return (
    <div className="max-w-2xl mx-auto text-center py-24">
      <div className="text-6xl">🪴</div>
      <h1 className="text-2xl font-semibold mt-4">Page not found</h1>
      <p className="text-gray-600 mt-2">The page you’re looking for doesn’t exist.</p>
      <a href="/" className="inline-block mt-6 px-4 py-2 rounded-xl bg-gray-900 text-white">Back home</a>
    </div>
  )
}