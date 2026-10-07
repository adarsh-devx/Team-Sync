import { useEffect, useRef, useState } from 'react'
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { toggleTheme } from '../../../../shared/state/ThemeSlice'
import { removeEmployee } from '../../../auth/state/auth/AuthSlice'
import { clearMockUser } from '../../../../mock/mockApi'
import { USE_MOCK_API } from '../../../../mock/mockConfig'
import { axiosInstance } from '../../../../config/axiosInstance'
import {
  adminNavigation,
  employeeNavigation,
} from '../../../../app/constant/navigations'
import NavigationTab from './NavigationTab'

// Single horizontal chrome: brand + nav links left, search/actions/user right.
// 240px ink sidebar (AsideNav) retired — ab sab kuch is bar me hai.
const TopNav = () => {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let { mode } = useSelector((store) => store.theme)
  let { employee } = useSelector((store) => store.auth)

  let [navOpen, setNavOpen] = useState(false)
  let [userOpen, setUserOpen] = useState(false)

  let searchRef = useRef(null)
  let userRef = useRef(null)

  let navigations =
    employee?.role === 'admin' ? adminNavigation : employeeNavigation

  let initials = employee?.name
    ? employee.name
        .split(' ')
        .map((w) => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'TS'

  let handleThemeChange = () => {
    dispatch(toggleTheme())
  }

  // Logout: server-side session + redux state clear karke login page pe bhej dete hain
  let handleLogout = () => {
    clearMockUser()

    // Real backend mode me refresh cookie bhi server pe invalidate karni hai,
    // warna logout ke baad bhi purana session chalta rehta hai.
    if (!USE_MOCK_API) {
      axiosInstance.post('/auth/logout').catch(() => {})
    }

    dispatch(removeEmployee())
    navigate('/')
  }

  // Ctrl/Cmd+K — badge jo dikhta hai wahi actually focus bhi karta hai
  useEffect(() => {
    let onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Bahar click pe user menu band
  useEffect(() => {
    if (!userOpen) return

    let onOutside = (e) => {
      if (!userRef.current?.contains(e.target)) setUserOpen(false)
    }

    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [userOpen])

  return (
    <header className="relative z-30 shrink-0 border-b border-[var(--border-color)] bg-[var(--bg-surface)]">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-6">
        {/* Brand */}
        <Link to="/home" className="flex shrink-0 items-center gap-2.5">
          <img src="/logo.webp" alt="Team Sync" className="h-7 w-7 shrink-0 object-contain" />
          <span className="font-display text-[15px] font-semibold tracking-tight text-[var(--text-primary)]">
            Team Sync
          </span>
        </Link>

        {/* Desktop nav — sidebar ki jagah horizontal */}
        <nav className="ml-3 hidden items-center gap-0.5 lg:flex">
          {navigations.map((nav) => (
            <NavigationTab
              key={nav.path}
              path={nav.path}
              Icon={nav.Icon}
              title={nav.title}
            />
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          {/* Search */}
          <div className="hidden items-center gap-2 rounded-[var(--radius-sm)] border border-[var(--border-color)] bg-[var(--bg-main)] px-3 py-1.5 text-[var(--text-muted)] transition-colors focus-within:border-[var(--accent)] md:flex md:w-52 xl:w-64">
            <Search size={15} className="shrink-0" />
            <input
              ref={searchRef}
              type="text"
              placeholder="Search..."
              className="w-full bg-transparent text-[13px] text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)]"
            />
            <kbd className="shrink-0 rounded border border-[var(--border-color)] px-1.5 py-0.5 text-[10px] font-medium text-[var(--text-muted)]">
              Ctrl K
            </kbd>
          </div>

          <button
            onClick={handleThemeChange}
            title="Toggle theme"
            className="cursor-pointer rounded-[var(--radius-sm)] p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            {mode === 'light' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            title="Notifications"
            className="relative cursor-pointer rounded-[var(--radius-sm)] p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          >
            <Bell size={17} />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </button>

          {/* User chip + menu */}
          <div
            ref={userRef}
            className="relative ml-1.5 border-l border-[var(--border-color)] pl-3"
          >
            <button
              onClick={() => setUserOpen((open) => !open)}
              className="flex cursor-pointer items-center gap-2.5 rounded-[var(--radius-sm)] px-1.5 py-1 transition-colors hover:bg-[var(--bg-hover)]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[12px] font-semibold text-[var(--accent)]">
                {initials}
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-[13px] font-medium text-[var(--text-primary)]">
                  {employee?.name || 'Guest'}
                </span>
                <span className="block text-[11px] capitalize text-[var(--text-muted)]">
                  {employee?.role || ''}
                </span>
              </span>
              <ChevronDown
                size={14}
                className={`hidden shrink-0 text-[var(--text-muted)] transition-transform sm:block ${
                  userOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {userOpen && (
              <div className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-[var(--radius-md)] border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-[var(--shadow-md)]">
                <div className="border-b border-[var(--border-color)] px-3.5 py-3">
                  <p className="text-[13px] font-medium text-[var(--text-primary)]">
                    {employee?.name || 'Guest'}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-[var(--text-muted)]">
                    {employee?.email || 'Not signed in'}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center gap-2 px-3.5 py-2.5 text-left text-[13px] text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--danger)]"
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile nav toggle */}
          <button
            onClick={() => setNavOpen((open) => !open)}
            title="Menu"
            className="ml-0.5 cursor-pointer rounded-[var(--radius-sm)] p-2 text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)] lg:hidden"
          >
            {navOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav panel — link click pe bubble ho kar band */}
      {navOpen && (
        <nav
          onClick={() => setNavOpen(false)}
          className="flex flex-col gap-0.5 border-t border-[var(--border-color)] px-3 py-2 lg:hidden"
        >
          {navigations.map((nav) => (
            <NavigationTab
              key={nav.path}
              path={nav.path}
              Icon={nav.Icon}
              title={nav.title}
            />
          ))}
        </nav>
      )}
    </header>
  )
}

export default TopNav
