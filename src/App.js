import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import {MeditationPlaylist, NoiseGenerator, ToneGenerators} from 'Components';
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
        <TabPanel><MeditationPlaylist /></TabPanel>
        <TabPanel><NoiseGenerator /></TabPanel>
        <TabPanel><ToneGenerators /></TabPanel>
      </Tabs>

    </div>
  );
}

export default App;
