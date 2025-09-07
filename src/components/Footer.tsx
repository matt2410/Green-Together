export default function Footer(){
  return (
    <footer className="border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex items-center justify-between">
        <p>© {new Date().getFullYear()} GreenTogether</p>
        <p className="opacity-75">Built with React + Tailwind</p>
      </div>
    </footer>
  )
}