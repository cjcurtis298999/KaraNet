export default function TopBar({ searchTerm, onSearch, onToast }) {
  return (
    <div className="topbar">
      <div>
        <span className="topbar-title">Media Contacts</span>
        <span className="topbar-sub">/ All</span>
      </div>
      <div className="topbar-actions">
        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555c73" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search contacts…"
            value={searchTerm}
            onChange={e => onSearch(e.target.value)}
          />
        </div>
        <button className="btn btn-ghost" onClick={() => onToast('📤 Export started')}>Export</button>
        <button className="btn btn-primary" onClick={() => onToast('➕ Add contact coming soon')}>+ Add Contact</button>
      </div>
    </div>
  )
}
