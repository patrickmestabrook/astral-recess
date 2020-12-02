import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { AppTitle, AppWrapper, MeditationSettingsForm } from 'Components/Styled';


/**
 * @function
 * @name Meditation
 */
function Meditation() {
  const meditationSettings = useStoreState(state => state.meditationSettings);
  const editMeditationSetting = useStoreActions(actions => actions.meditationSettings.editMeditationSetting);
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
