const RiskBandBadge = ({ band }) => {
  const getBandStyles = (band) => {
    const styles = {
      'Low Risk – High Need': 'bg-green-100 text-green-800 border-green-200',
      'Low Risk – Low Need': 'bg-blue-100 text-blue-800 border-blue-200',
      'High Risk – High Need': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'High Risk – Low Need': 'bg-red-100 text-red-800 border-red-200',
    }
    return styles[band] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getBandStyles(band)}`}>
      {band}
    </span>
  )
}

export default RiskBandBadge