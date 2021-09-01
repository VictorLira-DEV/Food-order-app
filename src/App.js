import React from 'react';
import Header from './components/Layoult/Header/Header';
import Meals from  './components/Meals/Meals/Meals'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Meals/>
      </main>
    </div>
  );
}

export default App;
