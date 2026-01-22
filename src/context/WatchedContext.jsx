import { createContext, useContext, useState, useEffect } from 'react'

const WatchedContext = createContext()

const STORAGE_KEY = 'anisearch_watched_anime'

// Helper to load initial state from localStorage
const loadInitialState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error loading watched anime from localStorage:', error)
    return []
  }
}

export const WatchedProvider = ({ children }) => {
  const [watched, setWatched] = useState(loadInitialState())
  const [loading, setLoading] = useState(false)

  // Persist to localStorage whenever watched changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watched))
    } catch (error) {
      console.error('Error saving watched anime to localStorage:', error)
    }
  }, [watched])

  /**
   * Add or update a watched anime entry
   */
  const addToWatched = (animeData, watchData = {}) => {
    const entry = {
      mal_id: animeData.mal_id,
      title: animeData.title,
      title_english: animeData.title_english,
      images: animeData.images,
      episodes: animeData.episodes,
      genres: animeData.genres || [],
      status: watchData.status || 'Watching',
      episodesWatched: watchData.episodesWatched || 0,
      rating: watchData.rating || 0,
      notes: watchData.notes || '',
      dateAdded: watchData.dateAdded || new Date().toISOString(),
      lastWatchedDate: watchData.lastWatchedDate || new Date().toISOString(),
    }

    setWatched((prev) => {
      const filtered = prev.filter((w) => w.mal_id !== entry.mal_id)
      return [...filtered, entry]
    })
  }

  /**
   * Update a watched anime entry
   */
  const updateWatchedAnime = (mal_id, updates) => {
    setWatched((prev) =>
      prev.map((w) =>
        w.mal_id === mal_id
          ? {
              ...w,
              ...updates,
              lastWatchedDate: new Date().toISOString(),
            }
          : w
      )
    )
  }

  /**
   * Remove anime from watched list
   */
  const removeFromWatched = (mal_id) => {
    setWatched((prev) => prev.filter((w) => w.mal_id !== mal_id))
  }

  /**
   * Get a specific watched anime
   */
  const getWatchedAnime = (mal_id) => {
    return watched.find((w) => w.mal_id === mal_id)
  }

  /**
   * Check if anime is in watched list
   */
  const isWatched = (mal_id) => {
    return watched.some((w) => w.mal_id === mal_id)
  }

  /**
   * Clear all watched anime
   */
  const clearAll = () => {
    setWatched([])
  }

  const value = {
    watched,
    loading,
    addToWatched,
    updateWatchedAnime,
    removeFromWatched,
    getWatchedAnime,
    isWatched,
    clearAll,
  }

  return (
    <WatchedContext.Provider value={value}>
      {children}
    </WatchedContext.Provider>
  )
}

export const useWatchedAnime = () => {
  const context = useContext(WatchedContext)
  if (!context) {
    throw new Error('useWatchedAnime must be used within a WatchedProvider')
  }
  return context
}
