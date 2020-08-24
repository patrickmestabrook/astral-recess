import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

export default {
  component: Button,
  title: 'Button',
  // Our exports that end in "Data" are not stories.
  decorators: [(Story) => <div style={{margin: '12em'}}><Story /></div>],
  excludeStories: /.*Data$/,
};

export const taskData = {
  id: '1',
  title: 'Test Task',
  state: 'TASK_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actionsData = {
  onClick: action('onClick'),
};

export const Default = () => <Button task={{ ...taskData }} {...actionsData}>This is a damn button</Button>;

export const Disabled = () => <Button task={{ ...taskData, state: 'TASK_PINNED' }} {...actionsData} />;