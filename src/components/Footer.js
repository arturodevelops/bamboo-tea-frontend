import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <a href='https://www.instagram.com/bamboo_teaa/profilecard/?igsh=MXY5bnpqMnhiem0w' style={styles.link}>
          <img src='https://i.imgur.com/wDUeIMM.jpeg' alt='Instagram' style={styles.icon} />
        </a>
        <p style={styles.text}>Follow us on Instagram!</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#000', // Darker background for a sleeker design
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    width: '100%',
    position: 'relative',
    bottom: 0,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none', // Remove default link styling
    transition: 'transform 0.3s ease-in-out',
  },
  icon: {
    width: '73px', // Instagram icon size
    height: '52px',
    borderRadius: '50%', // Circular icon
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)', // Subtle shadow for a floating effect
    transition: 'transform 0.3s ease-in-out',
  },
  text: {
    marginTop: '10px',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif',
    letterSpacing: '0.5px',
  },
  // Hover effects for the icon
  hoverEffect: {
    ':hover': {
      transform: 'scale(1.1)', // Enlarge the icon on hover
    },
  },
};

export default Footer;
