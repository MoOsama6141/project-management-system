import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const IndexRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </Router>
  );
};

export default IndexRouter;
