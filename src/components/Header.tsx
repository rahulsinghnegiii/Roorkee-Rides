import React from 'react'
import { ArrowLeft, Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  title: string
  showBack?: boolean
  showMenu?: boolean
  onMenuClick?: () => void
}

export default function Header({ title, showBack = false, showMenu = false, onMenuClick }: HeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="bg-white shadow-sm border-b border-gray-100 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}
        <h1 className="text-lg font-semibold text-gray-900 ml-2">{title}</h1>
      </div>
      
      {showMenu && (
        <button
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      )}
    </div>
  )
}