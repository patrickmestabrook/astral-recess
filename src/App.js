import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <section className="info-sidebar">
        <header>
            Astral Recess App Testbed
        </header>
      </section>

      <section className="tabs-container">
        <ul className="tab-labels">
          <li className="tab-label">meditations</li>
          <li className="tab-label">tones</li>
          <li className="tab-label">noises</li>
        </ul>
        <div className="tab-contents">

        </div>
      </section>
    </div>
  );
}

export default App;
