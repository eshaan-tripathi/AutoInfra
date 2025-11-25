'use client'

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-gray-300 px-6 lg:px-32 py-16 overflow-hidden">
      {/* Gradient Background Blobs */}
      <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full opacity-30 blur-3xl animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full opacity-30 blur-3xl animate-blob animation-delay-2000"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">AutoInfra</h2>
          <p className="text-gray-400">Automating cloud infrastructure so your business can deploy faster and smarter.</p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Product</h3>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-indigo-400 transition">Features</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Pricing</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Marketplace</a></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-indigo-400 transition">About</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition">Blog</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            {/* Rounded Gradient Social Icons */}
            <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold hover:scale-110 transform transition">
              F
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold hover:scale-110 transform transition">
              T
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-400 flex items-center justify-center text-white font-bold hover:scale-110 transform transition">
              L
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-red-400 flex items-center justify-center text-white font-bold hover:scale-110 transform transition">
              I
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AutoInfra. All rights reserved.
      </div>
    </footer>
  )
}
