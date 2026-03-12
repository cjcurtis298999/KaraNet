import { useEffect } from 'react'

export default function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(onDismiss, 2500)
    return () => clearTimeout(timer)
  }, [message, onDismiss])

  return (
    <div className={`toast${message ? ' show' : ''}`}>
      {message}
    </div>
  )
}
