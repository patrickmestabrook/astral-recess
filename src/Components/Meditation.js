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
          <div>
            <label htmlFor="duration">How long?</label>
            <input
              id="duration"
              type="number"
              onChange={({ target: { value }}) => editMeditationSetting({ setting: 'duration', value })}
              value={meditationSettings.duration}
            /> minutes
          </div>
          <label htmlFor="sound-preset">Audio?</label>
          <div>

          <label htmlFor="intention">Set your intention.</label>
            <textarea
              id="intention"
              type="text"
              onChange={({ target: { value }}) => editMeditationSetting({ setting: 'intention', value })}
              value={meditationSettings.intention}
            />
          </div>
          <input
            type="submit"
            value="Meditate"
          />
        </MeditationSettingsForm>
    </AppWrapper>
  );
}

export default Meditation;
