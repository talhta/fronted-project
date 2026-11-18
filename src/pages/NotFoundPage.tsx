import { Link, useLocation } from 'react-router'

// Shown for any URL that doesn't match a route (see the "*" route in App.tsx).
function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <div className="message">
      <h1>Page not found</h1>
      <p>
        There's no page at <code>{pathname}</code>.
      </p>
      <p>
        <Link to="/">Back to the list</Link>
      </p>
    </div>
  )
}

export default NotFoundPage
