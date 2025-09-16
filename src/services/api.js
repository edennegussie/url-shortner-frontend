// API service for URL shortener
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

// Generic API request function
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('API request failed:', error)
    return { success: false, error: error.message }
  }
}

// POST request to shorten a URL
export async function shortenUrl(longUrl) {
  return apiRequest('/shorten', {
    method: 'POST',
    body: JSON.stringify({ originalUrl: longUrl }),
  })
}
