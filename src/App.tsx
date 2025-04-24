import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Mandelbrot from './components/Mandelbrot'

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/">Homepage</Link> {' - '}
        <Link to="/mandelbrot">Mandelbrot</Link>
      </nav>

      <Routes>
        <Route path="/"></Route>
        <Route path="/mandelbrot" element={<Mandelbrot />} />
      </Routes>
    </Router>
  );
};

export default App;