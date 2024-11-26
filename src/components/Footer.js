import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer}>
      <p>© 2024 My Simple React App</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#000000',
    color: 'white',
    padding: '10px',
    textAlign: 'center',
    //position: 'fixed',
    bottom: 0,
    width: '100%',
  },
};

export default Footer;
