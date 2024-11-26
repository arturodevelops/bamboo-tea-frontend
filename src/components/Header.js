import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { totalCount } = useCart();

  return (
    <header style={styles.header}>
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <a href="../">
            <img src="https://bamboo-tea-media.s3.us-east-2.amazonaws.com/logo.png" alt="Logo" style={styles.logo}/>
          </a>
        </div>
        <div style={styles.navRight}>
          <Link to="/" style={styles.menuLink}>Menú</Link>
          <Link to="/cart" style={styles.menuLink}>
            <img src='http://localhost:8080/carrito.png' alt="carrito" style={styles.carrito} />
          </Link>
          <div style={styles.carrritoCounterContainer}>
            <h5 style={styles.carrritoCounter}>{totalCount}</h5>
          </div>
        </div>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    width: '100%',
    backgroundColor: '#FFF',
    padding: '0',
    margin: '0',
    boxSizing: 'border-box',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  navbar: {
    display: 'flex',
    backgroundColor: '#FFF',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.3)',
  },
  navLeft: {
    alignItems: 'left',
  },
  carrritoCounterContainer: {
    position: 'absolute',
    backgroundColor: '#FF0000',
    top: 15,
    right: 13,
    zIndex: 1,
    width: 20,
    height: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carrritoCounter: {
    color: 'white',
    margin: 0,
    fontSize: '12px',
  },
  logo: {
    width: '100px',
    height: 'auto',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '30px',
  },
  carrito: {
    width: 40,
    height: 'auto',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  navRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menuLink: {
    color: '#000',
    textDecoration: 'none',
    alignItems: 'center',
    marginLeft: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'color 0.3s ease',
    paddingRight: '20px',
  },
};

export default Header;
