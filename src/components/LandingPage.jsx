import { useState } from 'react'
import NavBar from './NavBar'
import { shortenUrl } from '../services/api'

function LandingPage() {
  const [url, setUrl] = useState('')
  const [displayedUrl, setDisplayedUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [apiResponse, setApiResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleShorten = async () => {
    if (!url.trim()) {
      setError('Please enter a valid URL')
      return
    }

    setLoading(true)
    setError('')
    setDisplayedUrl(url)
    setApiResponse(null)

    try {
      const result = await shortenUrl(url)
      
      if (result.success) {
        setShortenedUrl(result.data.shortUrl || result.data.shortenedUrl)
        setApiResponse(result.data)
        setError('')
      } else {
        setError(result.error || 'Failed to shorten URL')
        setShortenedUrl('')
        setApiResponse(null)
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.')
      setShortenedUrl('')
      setApiResponse(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavBar />
      <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">
            URL Shortner
          </h1>
          
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="space-y-6">
              {/* Input Field */}
              <div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter your long URL here..."
                  className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-[#fa7a85] focus:outline-none transition-colors duration-200 placeholder-gray-400"
                />
              </div>
              
              {/* Button */}
              <button
                onClick={handleShorten}
                disabled={loading}
                className="w-1/4 bg-gradient-to-r from-[#fa7a85] to-[#f09862] text-white font-semibold py-4 px-8 rounded-xl text-lg hover:from-[#f56a75] hover:to-[#e88a52] transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? 'Shortening...' : 'Shorten URL'}
              </button>
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}
            
            {/* Display entered URL */}
            {displayedUrl && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Original URL:</p>
                <p className="text-lg font-medium text-gray-800 break-all">{displayedUrl}</p>
              </div>
            )}
            
            {/* Display shortened URL */}
            {shortenedUrl && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-600 mb-2">Shortened URL:</p>
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-medium text-green-800 break-all flex-1">{shortenedUrl}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigator.clipboard.writeText(shortenedUrl)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => window.open(shortenedUrl, '_blank', 'noopener,noreferrer')}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Open
                    </button>
                  </div>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage