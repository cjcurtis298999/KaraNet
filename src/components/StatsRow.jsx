export default function StatsRow({ stats }) {
  return (
    <div className="stats-row">
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(91,110,245,0.12)' }}>👥</div>
        <div>
          <div className="stat-num">{stats.total}</div>
          <div className="stat-lbl">Total Contacts</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(34,201,122,0.12)' }}>🏢</div>
        <div>
          <div className="stat-num">{stats.pubs}</div>
          <div className="stat-lbl">Publications</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(245,200,66,0.12)' }}>✉️</div>
        <div>
          <div className="stat-num">{stats.emails}</div>
          <div className="stat-lbl">Email Contacts</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon" style={{ background: 'rgba(245,91,142,0.12)' }}>🎯</div>
        <div>
          <div className="stat-num">{stats.beats}</div>
          <div className="stat-lbl">Coverage Angles</div>
        </div>
      </div>
    </div>
  )
}
