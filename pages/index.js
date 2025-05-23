import { useRef, useState } from 'react';
import FluidWaveEffect from '../components/FluidWaveEffect';

export default function Home() {
  const scrollContainerRef = useRef(null);
  const [isWaveActive, setIsWaveActive] = useState(false);

  return (
    <div>
      <FluidWaveEffect
        scrollContainerRef={scrollContainerRef}
        buttonTriggerActive={isWaveActive}
      />
      
      <div
        ref={scrollContainerRef}
        style={{
          height: '100vh',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 1
        }}
      >
        <div style={{
          padding: '20px',
          color: 'white',
          minHeight: '200vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}>
          <h1 style={{ fontSize: '3rem', marginTop: '20vh' }}>
            Fluid Wave Effect Demo
          </h1>
          
          <button
            onClick={() => setIsWaveActive(!isWaveActive)}
            style={{
              padding: '1rem 2rem',
              fontSize: '1.2rem',
              backgroundColor: isWaveActive ? '#9c27b0' : '#2196f3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            {isWaveActive ? 'Deactivate Wave' : 'Activate Wave'}
          </button>

          <div style={{
            maxWidth: '600px',
            textAlign: 'center',
            marginTop: '40vh'
          }}>
            <h2>Scroll to Interact</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
              The wave effect responds to both scrolling and the button above.
              Try scrolling down this page to see how the wave animation changes,
              or click the button to trigger a more intense animation state.
            </p>
          </div>

          <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <h2>Keep Scrolling!</h2>
          </div>
        </div>
      </div>
    </div>
  );
} 