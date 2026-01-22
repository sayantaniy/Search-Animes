/**
 * Sorting utilities for watched anime
 */
export const sortOptions = [
  { value: 'recently-watched', label: 'Recently Watched' },
  { value: 'alphabetical', label: 'Alphabetical Order' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'date-added', label: 'Recently Added' },
]

export const sortWatchedAnime = (anime, sortBy) => {
  const sorted = [...anime]

  switch (sortBy) {
    case 'recently-watched':
      return sorted.sort(
        (a, b) =>
          new Date(b.lastWatchedDate) - new Date(a.lastWatchedDate)
      )
    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'date-added':
      return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded))
    default:
      return sorted
  }
}

/**
 * Filtering utilities for watched anime
 */
export const filterOptions = {
  status: [
    { value: 'all', label: 'All Status' },
    { value: 'Watching', label: 'Currently Watching' },
    { value: 'Completed', label: 'Completed' },
    { value: 'On Hold', label: 'On Hold' },
    { value: 'Dropped', label: 'Dropped' },
  ],
}

export const filterWatchedAnime = (anime, filters) => {
  return anime.filter((item) => {
    if (filters.status && filters.status !== 'all') {
      if (item.status !== filters.status) return false
    }

    if (filters.searchQuery) {
      if (!item.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false
      }
    }

    return true
  })
}

/**
 * Get status badge color
 */
export const getStatusColor = (status) => {
  const colors = {
    'Watching': 'from-blue-500 to-blue-600',
    'Completed': 'from-green-500 to-green-600',
    'On Hold': 'from-yellow-500 to-yellow-600',
    'Dropped': 'from-red-500 to-red-600',
  }
  return colors[status] || 'from-gray-500 to-gray-600'
}

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Get progress percentage
 */
export const getProgressPercentage = (episodesWatched, totalEpisodes) => {
  if (!totalEpisodes) return 0
  return Math.round((episodesWatched / totalEpisodes) * 100)
}
