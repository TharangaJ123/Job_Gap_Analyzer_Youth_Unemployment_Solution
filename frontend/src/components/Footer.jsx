import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="bg-gray-900/90 backdrop-blur-xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-12">
        {/* Bottom Section */}
        <div className="mt-2 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} GapAnalyzer By Tharanga Jayawardhana. All rights reserved.
          </p>
          <motion.div
            className="flex items-center text-gray-400 text-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span>Made with</span>
            <motion.div
              className="mx-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>for youth empowerment</span>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
} 