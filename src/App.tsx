import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClienteDetalhePage from './pages/ClienteDetalhePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cliente/:id" element={<ClienteDetalhePage />} />
      </Routes>
    </Router>
  );
};

export default App;
