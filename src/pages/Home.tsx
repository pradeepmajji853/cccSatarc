import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Users, Code2, Award, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotionLogo = ({ src, alt }: { src: string; alt: string }) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    className="relative group"
  >
    <motion.div
      className="absolute inset-0 bg-cyan-400 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"
      animate={{
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <img src={src} alt={alt} className="h-24 w-24 relative z-10 rounded-full" />
  </motion.div>
);

const FeatureCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-cyan-400/50 transition-colors"
  >
    <Icon className="w-8 h-8 text-cyan-400 mb-4" />
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-block mb-6"
          >
            <Shield className="w-20 h-20 text-cyan-400 mx-auto" />
          </motion.div>
          <h1 className="text-6xl font-bold text-white mb-6">
            Web Exploitation
            <span className="text-cyan-400"> 101</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A collaborative workshop bringing together the finest minds in cybersecurity
          </p>
        </motion.div>

        {/* Club Logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center items-center gap-12 mb-20"
        >
          <MotionLogo src="./ccc.png" alt="CCC Logo" />
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
            className="text-cyan-400"
          >
            <Code2 className="w-12 h-12" />
          </motion.div>
          <MotionLogo src="./satarc.png" alt="SATARC Logo" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            icon={Shield}
            title="Hands-on Learning"
            description="Practice real-world security scenarios in our controlled environment"
          />
          <FeatureCard
            icon={Users}
            title="Expert Guidance"
            description="Learn from industry professionals and experienced security researchers"
          />
          <FeatureCard
            icon={Award}
            title="CTF Challenges"
            description="Test your skills with our specially designed capture the flag challenges"
          />
        </div>

        {/* Workshop Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700 mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Sparkles className="text-cyan-400" />
            Workshop Schedule
          </h2>
          
          <div className="space-y-8">
            {['Day 1', 'Day 2', 'Day 3'].map((day, index) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-6"
              >
                <div className="flex-shrink-0 w-24">
                  <span className="text-cyan-400 font-bold">{day}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {index === 0 ? 'Fundamentals & Introduction' :
                     index === 1 ? 'Advanced Techniques' : 'Practical Applications'}
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    {index === 0 ? [
                      'Linux Basics & Web Fundamentals',
                      'Introduction to Security Concepts',
                      'Setting up Your Environment'
                    ] : index === 1 ? [
                      'SQL Injection Deep Dive',
                      'Cross-Site Scripting (XSS)',
                      'CSRF & SSRF Attacks'
                    ] : [
                      'Real-world Attack Scenarios',
                      'CTF Challenges',
                      'Defense Strategies'
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                      >
                        <ChevronRight className="w-4 h-4 text-cyan-400" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="text-center bg-cyan-400/10 rounded-2xl p-12 border border-cyan-400/20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Begin?</h2>
          <p className="text-gray-300 mb-8">Join us for an intensive journey into web security</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition-colors"
          >
            <Link to="/crud">Lets Begin the tutorial</Link>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;