import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

// Single-file React component that auto-generates a captcha every 25 seconds
// - No external libraries
// - Regenerates on page load and every 25s afterward
// - Shows a countdown and a "Refresh Captcha" button
// - Keeps your existing jokes fetch and feedback form

export default function App() {
  const [jokes, setJokes] = useState([])
  const [form, setForm] = useState({ name: '', email: '', message: '', captcha: '' })

  // captcha state and countdown
  const [captchaText, setCaptchaText] = useState('')
  const [countdown, setCountdown] = useState(25)

  // helper: generate a random alphanumeric captcha of given length
  const generateCaptcha = (length = 6) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // avoid confusing chars like 0/O, 1/I
    let out = ''
    for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)]
    return out
  }

  // fetch jokes once on mount
  useEffect(() => {
axios.get('https://students-db.onrender.com/api/jokes')
  .then(response => setJokes(response.data))
  .catch(error => console.error('Error fetching jokes:', error));
}, [])

  // setup captcha on mount and start countdown timer
  useEffect(() => {
    // initialize
    setCaptchaText(generateCaptcha(6))
    setCountdown(25)

    // interval ticks every 1s to update countdown; when it reaches 0 regenerate
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          // regenerate and reset to 25
          setCaptchaText(generateCaptcha(6))
          return 25
        }
        return prev - 1
      })
    }, 1000)

    // cleanup
    return () => clearInterval(interval)
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.captcha.trim().toUpperCase() !== captchaText.trim().toUpperCase()) {
      alert('Captcha is incorrect! Please check the characters and try again.')
      return
    }
    console.log('Feedback Submitted:', form)
    alert('Feedback submitted successfully!')
    setForm({ name: '', email: '', message: '', captcha: '' })
  }

  const refreshCaptchaNow = () => {
    setCaptchaText(generateCaptcha(6))
    setCountdown(25)
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1 style={{ color: '#4CAF50' }}>Ashish - Joke Hub</h1>
      <p>Total Jokes: {jokes.length}</p>

      {jokes.map((joke) => (
        <div key={joke.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '10px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ margin: '0', color: '#333' }}>{joke.title}</h2>
          <p style={{ margin: '5px 0', color: '#555' }}>{joke.content}</p>
        </div>
      ))}

      <hr style={{ margin: '30px 0' }} />

      <h2>Send Feedback</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', minHeight: '80px' }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <p style={{ margin: 0 }}>Captcha (auto-refreshes):</p>
            <div style={{ fontWeight: '700', fontSize: '20px', letterSpacing: '3px', background: '#efefef', padding: '8px 12px', borderRadius: '6px' }}>{captchaText}</div>
            <small style={{ display: 'block', marginTop: '4px' }}>Resets in {countdown}s</small>
          </div>

          <div>
            <button type="button" onClick={refreshCaptchaNow} style={{ padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>
              Refresh Captcha Now
            </button>
          </div>
        </div>

        <input
          type="text"
          name="captcha"
          placeholder="Enter Captcha"
          value={form.captcha}
          onChange={handleChange}
          required
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Send Feedback
        </button>
      </form>

      <p style={{ marginTop: '20px', color: '#666' }}>Tip: change the captcha length or the 25s interval in generateCaptcha() and the countdown initial value.</p>
    </div>
  )
}
