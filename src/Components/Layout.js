import React, { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Button } from 'Components';

function Layout() {
  const transport = {
    ...useStoreState(state => state.transport),
    ...useStoreActions(actions => actions.transport),
  };

  // example of using state and actions from  easy-peasy
  const count = useStoreState(state => state.count);
  const theme = useStoreState(state => state.theme);

  const incrementCount = useStoreActions(actions => actions.incrementCount);
  const toggleTheme = useStoreActions(actions => actions.toggleTheme);

  // Simple side effect, happens every render
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    console.log(`${count} this happens every render!`);
    console.log('transport is ', transport);
  });

  return (
    <div>
      <Button
        theme={theme}
        onClick={() => {
          incrementCount();
          toggleTheme();
        }}
      >
        This is the {theme} theme
      </Button>

      <Button
        disabled={transport.isPlaying}
        onClick={() => transport.play()}
      >
        play
      </Button>
      <Button
        disabled={transport.isPaused}
        onClick={() => transport.pause()}
      >
        pause
      </Button>
      <Button
        disabled={transport.isStopped}
        onClick={() => transport.stop()}
      >
        stop
      </Button>
    </div>
  );
}

export default Layout;
