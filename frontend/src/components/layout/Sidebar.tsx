import { useAuth } from '../../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  CheckSquare, 
  Award, 
  Users,
  Menu,
  X
} from 'lucide-react'
import { Button } from '../ui'
import { useState } from 'react'

type NavItem = {
  id: string
  label: string
  icon: React.ElementType
  roles: string[]
}

const adminNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin'] },
  { id: 'courses', label: 'Courses', icon: BookOpen, roles: ['admin', 'teacher'] },
  { id: 'modules', label: 'Modules', icon: Layers, roles: ['admin', 'teacher'] },
  { id: 'groups', label: 'Groups', icon: Users, roles: ['admin', 'teacher'] },
  { id: 'assessments', label: 'Assessments', icon: CheckSquare, roles: ['admin', 'teacher'] },
  { id: 'grades', label: 'Grades', icon: Award, roles: ['admin', 'teacher', 'student'] },
]

const teacherNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['teacher'] },
  { id: 'modules', label: 'Modules', icon: Layers, roles: ['teacher'] },
  { id: 'assessments', label: 'Assessments', icon: CheckSquare, roles: ['teacher'] },
  { id: 'groups', label: 'Groups', icon: Users, roles: ['teacher'] },
]

const studentNav: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['student'] },
  { id: 'courses', label: 'My Course', icon: BookOpen, roles: ['student'] },
  { id: 'modules', label: 'Modules', icon: Layers, roles: ['student'] },
  { id: 'assessments', label: 'Assessments', icon: CheckSquare, roles: ['student'] },
  { id: 'grades', label: 'My Grades', icon: Award, roles: ['student'] },
]

export function Sidebar() {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const getNavItems = () => {
    if (!user) return []
    const role = user.user_metadata?.role as string
    if (role === 'admin') return adminNav
    if (role === 'teacher') return teacherNav
    if (role === 'student') return studentNav
    return []
  }

  const navItems = getNavItems()

  const handleNavClick = (id: string) => {
    navigate(`/${id}`)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-card transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto border-r border-gray-700 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center px-6 border-b border-gray-700">
            <h2 className="text-xl font-bold text-primary">Menu</h2>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === `/${item.id}`
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
