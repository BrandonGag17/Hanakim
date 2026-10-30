import { useState } from 'react';
import logo from './assets/logo-4.png';
import './styles.css';

const ACCESS_CODE = '53343';

export default function App() {
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('idle');

  const checkCode = (event) => {
    event.preventDefault();
    setStatus(code.trim().toUpperCase() === ACCESS_CODE ? 'success' : 'error');
  };

  const tryAgain = () => {
    setCode('');
    setStatus('idle');
  };

  const isSuccess = status === 'success';

  return (
    <div className="screen">
      <div className="background-shapes" aria-hidden="true">
        <div className="blob blob-top" />
        <div className="blob blob-bottom" />
      </div>

      <header className="header">
        <div className="brand-mark" aria-hidden="true">
          <span className="brand-play">▶</span>
        </div>
        <span className="brand">Misión Hanakim</span>
      </header>

      <main className="content">
        {isSuccess ? (
          <section className="success-card" aria-live="polite">
            <div className="confetti-row" aria-hidden="true">
              <span className="confetti">✦</span>
              <span className="confetti">●</span>
              <span className="confetti">✦</span>
            </div>
            <div className="success-logo-wrap">
              <img className="success-logo" src={logo} alt="" />
            </div>
            <h1 className="success-title">¡LO LOGRASTE!</h1>
            <p className="success-message">
              EL VIDEO SE HA COMPLETADO:
              <br />
              VERIFICA TUS MENSAJES
            </p>
            <p className="success-hint">Tu próxima sorpresa ya está en camino.</p>
            <button className="secondary-button" type="button" onClick={tryAgain}>
              INGRESAR OTRO CÓDIGO
            </button>
          </section>
        ) : (
          <>
            <img className="hero-logo" src={logo} alt="Logo de Misión Hanakim" />
            <h1 className="title">Ingresa el código para desbloquear el video</h1>
            <p className="subtitle">hacia Eudamon...</p>

            <form className="form-card" onSubmit={checkCode}>
              <label className="input-label" htmlFor="access-code">
                CÓDIGO DE ACCESO
              </label>
              <input
                id="access-code"
                value={code}
                onChange={(event) => {
                  setCode(event.target.value);
                  setStatus('idle');
                }}
                autoCapitalize="characters"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Escribe aquí..."
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'code-error' : undefined}
                className={`input${status === 'error' ? ' input-error' : ''}`}
              />
              {status === 'error' && (
                <p className="error-text" id="code-error" role="alert">
                  Ups, ese código no es correcto. ¡Inténtalo otra vez!
                </p>
              )}
              <button className="primary-button" type="submit">
                ¡DESBLOQUEAR! ✨
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
