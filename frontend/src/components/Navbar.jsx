import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Github, Linkedin, Mail, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-green-500/20"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white">GapAnalyzer !</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="flex space-x-4">
            <motion.a
              href="https://github.com/TharangaJ123"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/tharanga-jay/"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>

          
        </div>
      </div>

      

    </motion.nav>
  );
} 