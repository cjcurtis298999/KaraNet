import { CONTACTS, getPubStyle, getAvatarGradient, getInitials, getAngleTags } from '../data/contacts'

export default function ContactPanel({ contactIdx, onClose, onToast }) {
  if (contactIdx === null) return null

  const c = CONTACTS[contactIdx]
  const grad = getAvatarGradient(contactIdx)
  const ps = getPubStyle(c.pub)
  const angles = getAngleTags(c.angle)

  return (
    <div className="panel-overlay open" onClick={e => { if (e.target.classList.contains('panel-overlay')) onClose() }}>
      <div className="panel">
        <div className="panel-top">
          <div>
            <div className="panel-avatar" style={{ background: grad }}>{getInitials(c)}</div>
            <div className="panel-name">{c.first} {c.last}</div>
            <div className="panel-role">{c.title || '—'}</div>
            <div className="panel-pub">
              <span style={{ color: ps.text }}>{c.pub}</span>
            </div>
          </div>
          <button className="panel-close" onClick={onClose}>✕</button>
        </div>

        <div className="panel-section">
          <div className="panel-section-title">Contact Details</div>
          <div className="info-row">
            <span className="info-label">Email</span>
            <span className="info-value" style={{ fontFamily: "'JetBrains Mono'", fontSize: 12, color: 'var(--accent2)' }}>
              {c.email !== '—' ? c.email : 'Not available'}
            </span>
          </div>
          <div className="info-row">
            <span className="info-label">Title</span>
            <span className="info-value">{c.title || '—'}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Publication</span>
            <span className="info-value">{c.pub}</span>
          </div>
        </div>

        <div className="panel-section">
          <div className="panel-section-title">Coverage Angles</div>
          <div className="tag-row">
            {angles.length > 0
              ? angles.map((t, i) => (
                  <span key={i} className="angle-tag" style={{ fontSize: 11, padding: '4px 10px' }}>{t}</span>
                ))
              : <span style={{ fontSize: 12, color: 'var(--text3)' }}>No angles listed</span>
            }
          </div>
        </div>

        <div className="panel-section">
          <div className="panel-section-title">Outreach Activity</div>
          <div style={{ fontSize: 12, color: 'var(--text3)', fontStyle: 'italic' }}>No outreach recorded yet.</div>
        </div>

        <div className="panel-actions">
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onToast('📧 Compose email coming soon')}>✉ Email</button>
          <button className="btn btn-ghost" onClick={() => onToast('📝 Note added')}>+ Note</button>
          <button className="btn btn-ghost" onClick={() => onToast('📋 Added to list')}>Add to List</button>
        </div>
      </div>
    </div>
  )
}
