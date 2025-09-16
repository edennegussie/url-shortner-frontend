function NavBar() {
  const handleLogin = () => {
    // TODO: Implement login functionality
    console.log('Login clicked')
  }

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Login Button */}
          <div className="flex items-center">
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-[#fa7a85] to-[#f09862] text-white font-semibold py-2 px-6 rounded-lg hover:from-[#f56a75] hover:to-[#e88a52] transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </div>

          {/* Right side - URL Icon */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-[#fa7a85]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
              <span className="text-xl font-bold text-gray-800">URL Shortner</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
