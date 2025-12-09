"use client";

import { Star, Quote, Sparkles, Users, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Small Shop Owner, Uttar Pradesh",
      content: "Got my ₹2 Lakh business loan in just 3 days! The process was so simple - just uploaded my electricity bills and got approved.",
      rating: 5,
    
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      name: "Priya Sharma",
      role: "Farmer, Madhya Pradesh",
      content: "As a farmer, I always struggled with paperwork. Credit Saarthi made it easy with their Hindi interface and voice guidance.",
      rating: 5,
      
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      name: "Amit Patel",
      role: "Daily Wage Worker, Gujarat",
      content: "No bank would give me a loan. Credit Saarthi understood my situation through my mobile recharge patterns and helped me get ₹50,000.",
      rating: 5,
     
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Loans Approved", icon: <Users className="w-5 h-5" />, color: "text-blue-600" },
    { value: "95%", label: "Satisfaction Rate", icon: <Award className="w-5 h-5" />, color: "text-green-600" },
    { value: "72H", label: "Avg. Processing", icon: <TrendingUp className="w-5 h-5" />, color: "text-purple-600" },
    { value: "4.9★", label: "App Rating", icon: <Star className="w-5 h-5" />, color: "text-yellow-600" }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
            Sucess
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 ml-3">Stories</span>
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from families who transformed their lives with Credit Saarthi
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 ${stat.color.replace('text-', 'bg-')} bg-opacity-10 rounded-lg`}>
                  {stat.icon}
                </div>
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-6">
                 
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-10 h-10 text-blue-500" />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Content */}
                <p className="text-gray-700 mb-6 italic relative">
                  <span className="absolute -left-2 -top-2 text-3xl opacity-20">"</span>
                  {testimonial.content}
                  <span className="absolute -right-2 -bottom-2 text-3xl opacity-20">"</span>
                </p>

                {/* Decorative Border */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-12 relative"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full translate-y-20 -translate-x-20"></div>
            
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-3">Join Thousands of Happy Families</h3>
              <p className="text-blue-100 mb-6">
                Start your journey towards financial empowerment today
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Apply Now - It's Free 
                </button>
               
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;