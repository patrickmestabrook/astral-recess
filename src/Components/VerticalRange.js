import React from 'react';
import { Direction, Range, getTrackBackground } from 'react-range';

function VerticalRange({ name, step, min, max, values, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px'}}>
      <Range
        step={step}
        min={min}
        max={max}
        direction={Direction.Up}
        values={values}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              flexGrow: 1,
              width: '36px',
              display: 'flex',
              justifyContent: 'center',
              height: '300px'
            }}
          >
            <div
              ref={props.ref}
              style={{
                width: '5px',
                height: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  colors: ['#548BF4', '#ccc'],
                  values,
                  min,
                  max,
                  direction: Direction.Up
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '42px',
              width: '42px',
              borderRadius: '4px',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                width: '16px',
                height: '5px',
                backgroundColor: isDragged ? '#548BF4' : '#CCC'
              }}
            />
          </div>
        )}
      />
      <label>{name}</label>
    </div>
  );
}

export default VerticalRange;