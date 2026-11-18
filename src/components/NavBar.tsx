import { Link, NavLink } from 'react-router'

function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          Pokédex
        </Link>
        <nav className="navbar-links" aria-label="Main">
          <NavLink to="/" end>
            List
          </NavLink>
          <NavLink to="/favorites">Favorites</NavLink>
          <NavLink to="/compare">Compare</NavLink>
        </nav>
      </div>
    </header>
  )
}

export default NavBar
