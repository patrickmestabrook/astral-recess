import React from 'react';
import { AppTitle, AppWrapper, MeditationSettingsForm } from 'Components/Styled';


/**
 * @function
 * @name Meditation
 */
function Meditation() {
  return (
    <AppWrapper>
      <AppTitle>welcome to Astral Recess</AppTitle>
        <p>Please enjoy your meditation.</p>

        <MeditationSettingsForm
          onSubmit={(e) => { e.preventDefault(); }}
        >


        </MeditationSettingsForm>
    </AppWrapper>
  );
}

export default Meditation;
