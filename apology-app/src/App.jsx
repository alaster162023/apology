import { useState, useEffect } from 'react'
import './App.css'

const HEARTS = ['💗', '💕', '💖', '💓', '💞', '🌸', '✨', '🎀']

function FloatingHeart({ id, style, emoji }) {
  return (
    <span key={id} className="floating-heart" style={style}>
      {emoji}
    </span>
  )
}

function App() {
  const [forgiven, setForgiven] = useState(false)
  const [noPos, setNoPos] = useState({ top: null, left: null })
  const [hearts, setHearts] = useState([])

  // Generate floating background hearts on mount
  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji: HEARTS[i % HEARTS.length],
      style: {
        left: `${Math.random() * 95}%`,
        animationDuration: `${4 + Math.random() * 6}s`,
        animationDelay: `${Math.random() * 5}s`,
        fontSize: `${1 + Math.random() * 1.5}rem`,
      },
    }))
    setHearts(generated)
  }, [])

  const runAway = () => {
    setNoPos({
      top: `${10 + Math.random() * 70}%`,
      left: `${5 + Math.random() * 80}%`,
    })
  }

  return (
    <div className="page">
      {/* floating background hearts */}
      <div className="hearts-bg">
        {hearts.map((h) => (
          <FloatingHeart key={h.id} {...h} />
        ))}
      </div>

      {forgiven ? (
        <div className="card forgiven-card">
          <div className="big-emoji">🥰</div>
          <h1>Yay!!</h1>
          <p className="subtitle">You&apos;re the best, thank you so much! 💖</p>
          <p className="message">
            I promise I&apos;ll make it up to you.
          </p>
          <div className="burst">
            {['🎉','💖','🌸','✨','🎀','💕','🎊','💗'].map((e, i) => (
              <span key={i} className="burst-emoji" style={{ animationDelay: `${i * 0.1}s` }}>{e}</span>
            ))}
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="big-emoji">🥺</div>
          <h1>I&apos;m Really Sorry Audrey</h1>
          <p className="subtitle">Please don&apos;t be mad at me 😔</p>
          <p className="message">
            I know I messed up and I&apos;m truly sorry.🌸
          </p>

          <p className="question">Do you forgive me? 👉👈</p>

          <div className="buttons">
            <button className="btn yes-btn" onClick={() => setForgiven(true)}>
              Yes! 💖
            </button>
            <button
              className="btn no-btn"
              style={noPos.top ? { position: 'fixed', top: noPos.top, left: noPos.left } : {}}
              onMouseEnter={runAway}
              onClick={runAway}
            >
              No 😤
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
