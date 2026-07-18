import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">GovScheme AI</div>

      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Schemes</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Login</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;