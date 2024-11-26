import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cart from './pages/Cart';

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="App-main">
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path='/cart' element={<Cart />}/>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </ChakraProvider>
  );
}

export default App;
