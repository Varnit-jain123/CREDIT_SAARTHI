import { 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  Brain, 
  History, 
  Settings 
} from 'lucide-react'

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'applications', label: 'Applications', icon: <FileText size={20} /> },
    { id: 'risk-analytics', label: 'Risk Analytics', icon: <BarChart3 size={20} /> },
    { id: 'models-scores', label: 'Models & Scores', icon: <Brain size={20} /> },
    { id: 'audit-log', label: 'Audit Log', icon: <History size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ]

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">CS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Credit Saarthi</h1>
            <p className="text-sm text-gray-500">Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className={`${currentPage === item.id ? 'text-primary-600' : 'text-gray-400'}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-semibold">AS</span>
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-800">Officer Sharma</p>
            <p className="text-sm text-gray-500">NBCFDC Officer</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar