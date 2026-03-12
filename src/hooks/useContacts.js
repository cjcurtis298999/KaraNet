import { useState, useMemo } from 'react'
import { CONTACTS } from '../data/contacts'

export function useContacts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pubFilter, setPubFilter] = useState('all')
  const [beatFilter, setBeatFilter] = useState('all')
  const [sortField, setSortField] = useState(null)
  const [sortAsc, setSortAsc] = useState(true)

  const filtered = useMemo(() => {
    let list = CONTACTS.slice()

    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      list = list.filter(c =>
        [c.pub, c.first, c.last, c.title, c.email, c.angle]
          .join(' ').toLowerCase().includes(q)
      )
    }

    if (pubFilter !== 'all') {
      const map = {
        bloomberg: 'Bloomberg',
        wsj: 'The Wall Street Journal',
        cnbc: 'CNBC',
        bi: 'Business Insider',
      }
      list = list.filter(c => c.pub === map[pubFilter])
    }

    if (beatFilter !== 'all') {
      const map = { ai: 'ai', investing: 'invest', wealth: 'wealth' }
      const kw = map[beatFilter]
      list = list.filter(c => c.angle.toLowerCase().includes(kw))
    }

    if (sortField) {
      list.sort((a, b) => {
        const va = (
          sortField === 'name' ? a.last + a.first :
          sortField === 'pub' ? a.pub :
          a.email
        ).toLowerCase()
        const vb = (
          sortField === 'name' ? b.last + b.first :
          sortField === 'pub' ? b.pub :
          b.email
        ).toLowerCase()
        return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va)
      })
    }

    return list
  }, [searchTerm, pubFilter, beatFilter, sortField, sortAsc])

  function toggleSort(field) {
    if (sortField === field) setSortAsc(a => !a)
    else { setSortField(field); setSortAsc(true) }
  }

  const stats = useMemo(() => {
    const pubs = new Set(filtered.map(c => c.pub)).size
    const emails = filtered.filter(c => c.email && c.email !== '—').length
    const beats = new Set(
      filtered.flatMap(c =>
        c.angle !== '—' ? c.angle.split(/[\/,]/).map(s => s.trim()) : []
      )
    ).size
    return { total: filtered.length, pubs, emails, beats }
  }, [filtered])

  return {
    contacts: filtered,
    stats,
    searchTerm, setSearchTerm,
    pubFilter, setPubFilter,
    beatFilter, setBeatFilter,
    sortField, sortAsc, toggleSort,
  }
}
