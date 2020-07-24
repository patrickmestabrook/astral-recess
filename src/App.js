import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <section className="info-sidebar">
        <header>
            Astral Recess App Testbed
        </header>
      </section>

      <Tabs>
        <TabList>
          <Tab>meditations</Tab>
          <Tab>tones</Tab>
          <Tab>noises</Tab>
        </TabList>
        <TabPanel>
          <p>A playlist of guided meditations.</p>
        </TabPanel>
        <TabPanel>
          <p>A tone(s) generator.</p>
        </TabPanel>
        <TabPanel>
          <p>A noise(s) generator.</p>
        </TabPanel>

      </Tabs>
    </div>
  );
}

export default App;
