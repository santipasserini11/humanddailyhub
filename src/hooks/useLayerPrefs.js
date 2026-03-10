import { useState, useEffect } from 'react'
import { EVENT_CFG } from '../constants/tokens.js'

const ALL_KEYS = Object.keys(EVENT_CFG)
const STORAGE_KEY = 'humand_layer_prefs'

export function useLayerPrefs(role) {
  const storageKey = `${STORAGE_KEY}_${role}`

  const getInitial = () => {
    try {
      const stored = sessionStorage.getItem(storageKey)
      if (stored) return JSON.parse(stored)
    } catch {}
    // Default: all on
    return ALL_KEYS.reduce((acc, k) => ({ ...acc, [k]: true }), {})
  }

  const [prefs, setPrefs] = useState(getInitial)

  // Persist to sessionStorage on change
  useEffect(() => {
    try { sessionStorage.setItem(storageKey, JSON.stringify(prefs)) } catch {}
  }, [prefs, storageKey])

  const toggle = (key) => setPrefs(p => ({ ...p, [key]: !p[key] }))

  const toggleAll = (on) => setPrefs(ALL_KEYS.reduce((acc, k) => ({ ...acc, [k]: on }), {}))

  // Returns array of active type keys
  const activeTypes = ALL_KEYS.filter(k => prefs[k])

  // Returns array compatible with old layers API
  const layers = ALL_KEYS.map(k => ({ key: k, on: !!prefs[k] }))

  return { prefs, toggle, toggleAll, activeTypes, layers }
}
