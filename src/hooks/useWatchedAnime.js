import { useState, useEffect } from 'react'

/**
 * Custom hook to manage watched anime data with localStorage persistence
 * Scalable structure ready for backend integration
 */
const useWatchedAnime = () => {
  const [watched, setWatched] = useState([])
  const [loading, setLoading] = useState(true)

  const STORAGE_KEY = 'anisearch_watched_anime'

  // Initialize from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setWatched(JSON.parse(stored))
      }
    } catch (error) {
      console.error('Error loading watched anime from localStorage:', error)
    } finally {
      setLoading(false)
    }
  }, [])

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
   * @param {Object} animeData - Anime data including mal_id, title, images, etc.
   * @param {Object} watchData - Watch data (status, episodesWatched, rating, notes, etc.)
   */
  const addToWatched = (animeData, watchData = {}) => {
    const entry = {
      mal_id: animeData.mal_id,
      title: animeData.title,
      title_english: animeData.title_english,
      images: animeData.images,
      episodes: animeData.episodes,
      genres: animeData.genres || [],
      status: watchData.status || 'Watching', // Watching, Completed, Dropped, On Hold
      episodesWatched: watchData.episodesWatched || 0,
      rating: watchData.rating || 0, // 0-10
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

  return {
    watched,
    loading,
    addToWatched,
    updateWatchedAnime,
    removeFromWatched,
    getWatchedAnime,
    isWatched,
    clearAll,
  }
}

export default useWatchedAnime
