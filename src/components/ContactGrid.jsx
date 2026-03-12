import { CONTACTS, getPubStyle, getAvatarGradient, getInitials, getAngleTags } from '../data/contacts'

export default function ContactGrid({ contacts, onOpenPanel }) {
  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">🔍</div>
        <p>No contacts match your filters</p>
      </div>
    )
  }

  return (
    <div className="card-grid">
      {contacts.map((c) => {
        const idx = CONTACTS.indexOf(c)
        const grad = getAvatarGradient(idx)
        const ps = getPubStyle(c.pub)
        const tags = getAngleTags(c.angle).slice(0, 2)

        return (
          <div key={idx} className="contact-card" onClick={() => onOpenPanel(idx)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="card-avatar" style={{ background: grad }}>{getInitials(c)}</div>
              <div>
                <div className="card-name">{c.first} {c.last}</div>
                <div className="card-title">{c.title || '—'}</div>
              </div>
            </div>
            <div className="pub-pill" style={{ background: ps.bg, borderColor: ps.border, color: ps.text, alignSelf: 'flex-start' }}>
              <div className="pub-dot" style={{ background: ps.dot }} />
              {c.pub}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {tags.map((t, i) => <span key={i} className="angle-tag">{t}</span>)}
            </div>
            <div className="card-email">{c.email !== '—' ? c.email : 'No email'}</div>
          </div>
        )
      })}
    </div>
  )
}
