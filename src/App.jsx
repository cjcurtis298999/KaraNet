import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import FiltersBar from './components/FiltersBar'
import StatsRow from './components/StatsRow'
import ContactTable from './components/ContactTable'
import ContactGrid from './components/ContactGrid'
import ContactPanel from './components/ContactPanel'
import SocialMedia from './components/SocialMedia'
import Toast from './components/Toast'
import { useContacts } from './hooks/useContacts'
import { CONTACTS } from './data/contacts'

export default function App() {
  const {
    contacts, stats,
    searchTerm, setSearchTerm,
    pubFilter, setPubFilter,
    beatFilter, setBeatFilter,
    sortField, sortAsc, toggleSort,
  } = useContacts()

  const [view, setView] = useState('list')
  const [panelIdx, setPanelIdx] = useState(null)
  const [toast, setToast] = useState('')
  const [activePage, setActivePage] = useState('contacts')

  function showToast(msg) {
    setToast(msg)
  }

  function handleNav(page) {
    setActivePage(page)
    setPanelIdx(null)
  }

  return (
    <div className="layout">
      <Sidebar contactCount={CONTACTS.length} activePage={activePage} onNav={handleNav} />

      {activePage === 'social-media' ? (
        <SocialMedia />
      ) : (
        <div className="main">
          <TopBar searchTerm={searchTerm} onSearch={setSearchTerm} onToast={showToast} />
          <FiltersBar
            pubFilter={pubFilter}
            beatFilter={beatFilter}
            onPubFilter={setPubFilter}
            onBeatFilter={setBeatFilter}
          />
          <StatsRow stats={stats} />

          <div className="content">
            <div className="table-wrap">
              <div className="table-header-row">
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>All Contacts</span>
                  <span className="contact-count">{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</span>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <div className="view-toggle">
                    <button
                      className={`view-btn${view === 'list' ? ' active' : ''}`}
                      onClick={() => setView('list')}
                      title="List view"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                        <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                        <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                      </svg>
                    </button>
                    <button
                      className={`view-btn${view === 'grid' ? ' active' : ''}`}
                      onClick={() => setView('grid')}
                      title="Grid view"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {view === 'list' && (
                <ContactTable
                  contacts={contacts}
                  sortField={sortField}
                  sortAsc={sortAsc}
                  onSort={toggleSort}
                  onOpenPanel={setPanelIdx}
                  onToast={showToast}
                />
              )}

              {view === 'grid' && (
                <ContactGrid contacts={contacts} onOpenPanel={setPanelIdx} />
              )}
            </div>
          </div>
        </div>
      )}

      {panelIdx !== null && (
        <ContactPanel
          contactIdx={panelIdx}
          onClose={() => setPanelIdx(null)}
          onToast={showToast}
        />
      )}

      <Toast message={toast} onDismiss={() => setToast('')} />
    </div>
  )
}
