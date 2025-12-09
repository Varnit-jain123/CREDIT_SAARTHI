import { Users, Clock, Award, Shield, TrendingUp, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: 10000,
      suffix: "+",
      label: "Families Benefited",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: 5,
      suffix: " min",
      label: "Average Processing",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 95,
      suffix: "%",
      label: "Accuracy Rate",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      value: 99,
      suffix: "%",
      label: "Fraud Detection",
      color: "text-red-600",
      bgColor: "bg-red-100"
    }
  ];

  const additionalStats = [
    { value: "24/7", label: "Application Support" },
    { value: "₹0", label: "Application Fees" },
    { value: "100%", label: "Digital Process" },
    { value: "5+", label: "Languages Supported" }
  ];

  return (
    <section ref={ref} className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            Making Real Impact
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Numbers that show our commitment to empowering backward-class families
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg card-hover"
            >
              <div className={`${stat.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                <div className={stat.color}>
                  {stat.icon}
                </div>
              </div>
              
              <div className="text-center mb-2">
                <div className="text-4xl font-bold text-dark">
                  {isInView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
              </div>
              
              <p className="text-center text-gray-600 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {additionalStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <p className="text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { icon: <Shield className="w-5 h-5" />, text: "RBI Compliant" },
              { icon: <TrendingUp className="w-5 h-5" />, text: "AI-Powered" },
              { icon: <Globe className="w-5 h-5" />, text: "NBCFDC Partner" },
              { icon: <Award className="w-5 h-5" />, text: "Secure Platform" }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                <div className="text-primary">{item.icon}</div>
                <span className="text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;