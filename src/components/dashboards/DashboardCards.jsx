import React from 'react';
import { FiCheckCircle, FiClock, FiXCircle, FiFileText } from 'react-icons/fi';

const DashboardCards = ({ applications = [] }) => {
  const approved = applications.filter(app => app.status === 'approved').length;
  const pending = applications.filter(app => app.status === 'pending').length;
  const rejected = applications.filter(app => app.status === 'rejected').length;
  const total = applications.length || 0;

  const stats = {
    approved,
    pending,
    rejected,
    total
  };

  const cards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: <FiFileText className="text-3xl text-purple-600" />,
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      accentColor: "bg-purple-100"
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: <FiCheckCircle className="text-3xl text-emerald-600" />,
      bgColor: "from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200",
      accentColor: "bg-emerald-100"
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FiClock className="text-3xl text-amber-600" />,
      bgColor: "from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
      accentColor: "bg-amber-100"
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FiXCircle className="text-3xl text-rose-600" />,
      bgColor: "from-rose-50 to-rose-100",
      borderColor: "border-rose-200",
      accentColor: "bg-rose-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`backdrop-blur-xl bg-gradient-to-br ${card.bgColor} border ${card.borderColor} rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-1">{card.title}</p>
              <p className="text-4xl font-bold text-gray-800">{card.value}</p>
            </div>
            <div className={`p-3 ${card.accentColor} rounded-xl backdrop-blur`}>
              {card.icon}
            </div>
          </div>
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  index === 0 ? 'bg-purple-500' :
                  index === 1 ? 'bg-emerald-500' :
                  index === 2 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ width: `${total ? (card.value / total) * 100 : 0}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {(total ? ((card.value / total) * 100).toFixed(1) : '0.0')}% of total
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;