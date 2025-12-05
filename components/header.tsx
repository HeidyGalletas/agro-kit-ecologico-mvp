"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-border shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-[#2E7D32]">🌱 AgroKit</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/"
            className={`text-base font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-foreground"
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/login"
            className={`text-base font-medium transition-colors hover:text-primary ${
              pathname === "/login" ? "text-primary" : "text-foreground"
            }`}
          >
            Login
          </Link>
          <Link
            href="/registro"
            className="bg-primary hover:bg-[#45a049] text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Registro
          </Link>
        </nav>
      </div>
    </header>
  )
}
