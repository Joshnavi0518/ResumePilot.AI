import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

function ProfileMenu({ user, onLogout }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const initials = user?.name?.[0] || user?.email?.[0] || '?'

  return (
    <div className="profile-menu position-relative" ref={menuRef}>
      <button
        type="button"
        className="btn btn-light rounded-circle shadow-sm profile-trigger"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open profile menu"
      >
        {initials.toUpperCase()}
      </button>
      {open && (
        <div className="profile-dropdown card shadow-lg border-0">
          <div className="card-body p-3">
            <p className="fw-semibold mb-0">{user?.name || 'Team member'}</p>
            <p className="text-muted small mb-3">{user?.email}</p>
            <button type="button" className="btn btn-outline-danger w-100" onClick={onLogout}>
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

ProfileMenu.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
}

ProfileMenu.defaultProps = {
  user: null,
}

export default ProfileMenu


