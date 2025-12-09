import { Search, Bell, ChevronDown } from 'lucide-react'

const Topbar = ({ pageTitle }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
          <p className="text-gray-500 text-sm">Monitor and manage loan applications</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-semibold">AS</span>
            </div>
            <div className="hidden md:block">
              <p className="font-medium text-gray-800">Anil Sharma</p>
              <p className="text-sm text-gray-500">Officer ID: NBCFDC-045</p>
            </div>
            <ChevronDown className="text-gray-400" size={20} />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar