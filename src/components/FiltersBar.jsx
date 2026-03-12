const PUB_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'bloomberg', label: 'Bloomberg' },
  { value: 'wsj', label: 'WSJ' },
  { value: 'cnbc', label: 'CNBC' },
  { value: 'bi', label: 'Business Insider' },
]

const BEAT_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'ai', label: 'AI / Fintech' },
  { value: 'investing', label: 'Investing' },
  { value: 'wealth', label: 'Wealth' },
]

export default function FiltersBar({ pubFilter, beatFilter, onPubFilter, onBeatFilter }) {
  return (
    <div className="filters-bar">
      <span className="filter-label">Publication:</span>
      {PUB_FILTERS.map(f => (
        <div
          key={f.value}
          className={`filter-chip${pubFilter === f.value ? ' active' : ''}`}
          onClick={() => onPubFilter(f.value)}
        >
          {f.label}
        </div>
      ))}

      <div className="filter-sep" />

      <span className="filter-label">Beat:</span>
      {BEAT_FILTERS.map(f => (
        <div
          key={f.value}
          className={`filter-chip${beatFilter === f.value ? ' active' : ''}`}
          onClick={() => onBeatFilter(f.value)}
        >
          {f.label}
        </div>
      ))}
    </div>
  )
}
