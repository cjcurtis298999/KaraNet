import { useState, useMemo } from 'react'
import { CONTACTS, getPubStyle, getAvatarGradient, getInitials } from '../data/contacts'
import { TWEETS } from '../data/twitter'

const TABS = [
  { id: 'twitter', label: 'Twitter / X Activity' },
  { id: 'linkedin', label: 'LinkedIn', soon: true },
  { id: 'instagram', label: 'Instagram', soon: true },
]

function StatCard({ label, value, sub, color }) {
  return (
    <div className="sm-stat-card">
      <div className="sm-stat-value" style={{ color: color || 'var(--text)' }}>{value}</div>
      <div className="sm-stat-label">{label}</div>
      {sub && <div className="sm-stat-sub">{sub}</div>}
    </div>
  )
}

function TweetCard({ tweet }) {
  const contact = CONTACTS[tweet.contactIdx]
  if (!contact) return null
  const pubStyle = getPubStyle(contact.pub)
  const gradient = getAvatarGradient(tweet.contactIdx)
  const initials = getInitials(contact)
  const fullName = contact.first === '—' ? '—' : `${contact.first} ${contact.last}`.trim()

  return (
    <div className="tweet-card">
      <div className="tweet-avatar" style={{ background: gradient }}>{initials}</div>
      <div className="tweet-body">
        <div className="tweet-meta">
          <span className="tweet-name">{fullName}</span>
          <span className="tweet-handle">{contact.twitter}</span>
          <span
            className="tweet-pub-badge"
            style={{ background: pubStyle.bg, border: `1px solid ${pubStyle.border}`, color: pubStyle.text }}
          >
            {contact.pub}
          </span>
          <span className="tweet-time">{tweet.time}</span>
        </div>
        <p className="tweet-text">{tweet.text}</p>
        <div className="tweet-engagement">
          <span className="tweet-eng-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {tweet.likes.toLocaleString()}
          </span>
          <span className="tweet-eng-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="17 1 21 5 17 9"/>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
              <polyline points="7 23 3 19 7 15"/>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
            </svg>
            {tweet.retweets.toLocaleString()}
          </span>
          <span className="tweet-eng-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            {tweet.replies}
          </span>
          <span className="tweet-eng-total">
            {(tweet.likes + tweet.retweets + tweet.replies).toLocaleString()} engagements
          </span>
        </div>
      </div>
    </div>
  )
}

export default function SocialMedia() {
  const [activeTab, setActiveTab] = useState('twitter')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('recent')

  const monitoredCount = CONTACTS.filter(c => c.twitter).length

  const totalEngagement = TWEETS.reduce((sum, t) => sum + t.likes + t.retweets + t.replies, 0)

  const topVoice = useMemo(() => {
    const engByContact = {}
    TWEETS.forEach(t => {
      engByContact[t.contactIdx] = (engByContact[t.contactIdx] || 0) + t.likes + t.retweets + t.replies
    })
    const topIdx = Object.entries(engByContact).sort((a, b) => b[1] - a[1])[0]?.[0]
    if (topIdx == null) return null
    const c = CONTACTS[Number(topIdx)]
    return c ? `${c.first} ${c.last}`.trim() : null
  }, [])

  const filtered = useMemo(() => {
    let list = [...TWEETS]
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(t => {
        const c = CONTACTS[t.contactIdx]
        if (!c) return false
        const name = `${c.first} ${c.last}`.toLowerCase()
        return (
          name.includes(q) ||
          (c.twitter || '').toLowerCase().includes(q) ||
          c.pub.toLowerCase().includes(q) ||
          t.text.toLowerCase().includes(q)
        )
      })
    }
    if (sortBy === 'engagement') {
      list.sort((a, b) => (b.likes + b.retweets + b.replies) - (a.likes + a.retweets + a.replies))
    }
    return list
  }, [search, sortBy])

  return (
    <div className="main">
      {/* Header */}
      <div className="topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>Social Media</div>
          <span style={{
            fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
            background: 'rgba(91,110,245,0.15)', border: '1px solid rgba(91,110,245,0.35)',
            color: 'var(--accent2)', borderRadius: 4, padding: '2px 7px'
          }}>Live Monitor</span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="search-box" style={{ width: 220 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              placeholder="Search journalists or keywords…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="sm-tab-bar">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`sm-tab${activeTab === tab.id ? ' active' : ''}${tab.soon ? ' soon' : ''}`}
            onClick={() => !tab.soon && setActiveTab(tab.id)}
          >
            {tab.id === 'twitter' && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.265 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
              </svg>
            )}
            {tab.label}
            {tab.soon && <span className="sm-tab-soon">Soon</span>}
          </button>
        ))}
      </div>

      <div className="content">
        {/* Stats row */}
        <div className="sm-stats-row">
          <StatCard label="Journalists Monitored" value={monitoredCount} sub="with Twitter / X" color="var(--accent2)" />
          <StatCard label="Tweets Tracked" value={TWEETS.length} sub="in feed" color="var(--cyan)" />
          <StatCard label="Total Engagements" value={totalEngagement.toLocaleString()} sub="likes + RTs + replies" color="var(--green)" />
          <StatCard label="Top Voice" value={topVoice || '—'} sub="by engagement" color="var(--yellow)" />
        </div>

        {/* Feed controls */}
        <div className="sm-feed-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Recent Activity</span>
            <span className="contact-count">{filtered.length} tweet{filtered.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="sm-sort-toggle">
            <button
              className={`sm-sort-btn${sortBy === 'recent' ? ' active' : ''}`}
              onClick={() => setSortBy('recent')}
            >
              Most Recent
            </button>
            <button
              className={`sm-sort-btn${sortBy === 'engagement' ? ' active' : ''}`}
              onClick={() => setSortBy('engagement')}
            >
              Top Engagement
            </button>
          </div>
        </div>

        {/* Tweet feed */}
        <div className="tweet-feed">
          {filtered.length === 0 ? (
            <div style={{ padding: '48px 0', textAlign: 'center', color: 'var(--text3)', fontSize: 13 }}>
              No tweets match your search.
            </div>
          ) : (
            filtered.map(tweet => <TweetCard key={tweet.id} tweet={tweet} />)
          )}
        </div>
      </div>
    </div>
  )
}
