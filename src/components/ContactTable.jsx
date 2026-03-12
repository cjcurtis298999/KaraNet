import { useState } from 'react'
import { CONTACTS, getPubStyle, getAvatarGradient, getInitials, getAngleTags } from '../data/contacts'

export default function ContactTable({ contacts, sortField, sortAsc, onSort, onOpenPanel, onToast }) {
  const [allChecked, setAllChecked] = useState(false)

  function handleSelectAll(e) {
    setAllChecked(e.target.checked)
  }

  if (contacts.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">🔍</div>
        <p>No contacts match your filters</p>
      </div>
    )
  }

  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: 36 }}>
            <input type="checkbox" className="cb" checked={allChecked} onChange={handleSelectAll} />
          </th>
          <th className={sortField === 'name' ? 'sorted' : ''} onClick={() => onSort('name')}>
            Contact <span className="sort-arrow">{sortField === 'name' ? (sortAsc ? '↑' : '↓') : '↕'}</span>
          </th>
          <th className={sortField === 'pub' ? 'sorted' : ''} onClick={() => onSort('pub')}>
            Publication <span className="sort-arrow">{sortField === 'pub' ? (sortAsc ? '↑' : '↓') : '↕'}</span>
          </th>
          <th className={sortField === 'email' ? 'sorted' : ''} onClick={() => onSort('email')}>
            Email <span className="sort-arrow">{sortField === 'email' ? (sortAsc ? '↑' : '↓') : '↕'}</span>
          </th>
          <th>Coverage Angle</th>
          <th>Status</th>
          <th style={{ width: 80 }}></th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((c) => {
          const idx = CONTACTS.indexOf(c)
          const ps = getPubStyle(c.pub)
          const grad = getAvatarGradient(idx)
          const tags = getAngleTags(c.angle).slice(0, 2)
          const email = c.email && c.email !== '—' ? c.email : '—'
          const hasEmail = email !== '—'

          return (
            <tr key={idx} onClick={() => onOpenPanel(idx)}>
              <td onClick={e => e.stopPropagation()}>
                <input type="checkbox" className="cb" checked={allChecked} onChange={() => {}} />
              </td>
              <td>
                <div className="contact-cell">
                  <div className="contact-avatar" style={{ background: grad }}>
                    {getInitials(c)}
                  </div>
                  <div>
                    <div className="contact-name">{c.first} {c.last}</div>
                    <div className="contact-title">{c.title || '—'}</div>
                  </div>
                </div>
              </td>
              <td>
                <div className="pub-pill" style={{ background: ps.bg, borderColor: ps.border, color: ps.text }}>
                  <div className="pub-dot" style={{ background: ps.dot }} />
                  {c.pub}
                </div>
              </td>
              <td>
                {hasEmail
                  ? <a className="email-link" href={`mailto:${email}`} onClick={e => e.stopPropagation()}>{email}</a>
                  : <span style={{ color: 'var(--text3)' }}>—</span>
                }
              </td>
              <td>
                {tags.map((t, i) => <span key={i} className="angle-tag">{t}</span>)}
              </td>
              <td>
                <div className="status-dot">
                  <div className="dot" style={{ background: hasEmail ? '#22c97a' : '#555c73' }} />
                  <span style={{ color: hasEmail ? '#22c97a' : 'var(--text3)', fontSize: 11 }}>
                    {hasEmail ? 'Active' : 'Incomplete'}
                  </span>
                </div>
              </td>
              <td>
                <div className="action-btns">
                  <button
                    className="action-btn"
                    title="Email"
                    onClick={e => { e.stopPropagation(); onToast('📧 Email compose coming soon') }}
                  >✉</button>
                  <button
                    className="action-btn"
                    title="Add to list"
                    onClick={e => { e.stopPropagation(); onToast('📋 Added to list') }}
                  >+</button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
