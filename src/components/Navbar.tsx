import { Link, NavLink } from "react-router-dom"
import logo from "../assets/logo.svg"

export default function Navbar() {
  const navItem = "px-3 py-2 rounded-xl text-sm font-medium"
  const active = "bg-gray-900 text-white"
  const idle = "text-gray-700 hover:bg-gray-100"
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="GreenTogether logo" className="w-8 h-8" />
          <span className="font-bold text-lg">GreenTogether</span>
        </Link>
        <nav className="ml-auto flex items-center gap-1">
          <NavLink to="/" end className={({isActive})=> `${navItem} ${isActive?active:idle}`}>Overview</NavLink>
          <NavLink to="/goals" className={({isActive})=> `${navItem} ${isActive?active:idle}`}>Goals</NavLink>
          <NavLink to="/timeline" className={({isActive})=> `${navItem} ${isActive?active:idle}`}>Timeline</NavLink>
          <NavLink to="/projects" className={({isActive})=> `${navItem} ${isActive?active:idle}`}>Projects</NavLink>
          <NavLink to="/team" className={({isActive})=> `${navItem} ${isActive?active:idle}`}>Team</NavLink>
          <NavLink to="/impact" className={({isActive})=> `${navItem} ${isActive?active:idle}`}>Impact</NavLink>
        </nav>
      </div>
    </header>
  )
}