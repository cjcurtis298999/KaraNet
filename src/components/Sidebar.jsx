export default function Sidebar({ contactCount, activePage, onNav }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">📡</div>
        <div className="logo-text">Media<span>IQ</span></div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Workspace</div>
        <div
          className={`nav-item${activePage === 'contacts' ? ' active' : ''}`}
          onClick={() => onNav('contacts')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Contacts
          <span className="nav-badge">{contactCount}</span>
        </div>
        <div className="nav-item" onClick={() => onNav('outreach')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z"/>
          </svg>
          Outreach
        </div>
        <div className="nav-item" onClick={() => onNav('campaigns')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Campaigns
        </div>
        <div className="nav-item" onClick={() => onNav('analytics')}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
          </svg>
          Analytics
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Analytics</div>
        <div
          className={`nav-item${activePage === 'social-media' ? ' active' : ''}`}
          onClick={() => onNav('social-media')}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.265 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
          </svg>
          Social Media
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">Lists</div>
        <div className="nav-item">
          <span style={{ fontSize: 10, width: 15, height: 15, background: '#22c97a22', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22c97a' }}>●</span>
          Investing Beat
        </div>
        <div className="nav-item">
          <span style={{ fontSize: 10, width: 15, height: 15, background: '#f5c84222', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f5c842' }}>●</span>
          AI / Fintech
        </div>
        <div className="nav-item">
          <span style={{ fontSize: 10, width: 15, height: 15, background: '#5b6ef522', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5b6ef5' }}>●</span>
          Wealth & Retail
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="user-pill">
          <div className="avatar">CQ</div>
          <div className="user-info">
            <div className="name">Chris Q.</div>
            <div className="role">Admin · CreatorIQ</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
