import { NavLink } from 'react-router'

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        List
      </NavLink>
      <NavLink to="/favorites">Favorites</NavLink>
      <NavLink to="/compare">Compare</NavLink>
    </nav>
  )
}

export default NavBar
