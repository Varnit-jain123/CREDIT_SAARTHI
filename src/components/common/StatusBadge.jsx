const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    const styles = {
      'Auto-Approved': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Manual Review': 'bg-orange-100 text-orange-800',
      'Declined': 'bg-red-100 text-red-800',
      'Approved': 'bg-green-100 text-green-800',
    }
    return styles[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusStyles(status)}`}>
      {status}
    </span>
  )
}

export default StatusBadge