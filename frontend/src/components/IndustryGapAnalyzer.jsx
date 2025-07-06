import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, Briefcase, CheckCircle2, XCircle, Lightbulb, Loader2, AlertCircle, Zap, TrendingUp, Star } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function JobAnalyzer() {
  const [cvFile, setCvFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progressStage, setProgressStage] = useState("");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    initial: { scale: 1, opacity: 1 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const loadingVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const progressBarVariants = {
    initial: { width: 0 },
    animate: {
      width: "100%",
      transition: {
        duration: 3,
        ease: "easeInOut"
      }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const skillItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      x: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!cvFile || !jobDescription) {
      setError("Please upload a CV and enter a job description");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("cv", cvFile);
    formData.append("job_description", jobDescription);

    try {

      // Simulate different processing stages
      const stages = [
        "Extracting CV content...",
        "Analyzing job requirements...",
        "Comparing skills and experience...",
        "Generating recommendations...",
        "Finalizing analysis..."
      ];

      for (let i = 0; i < stages.length; i++) {
        setProgressStage(stages[i]);
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      const res = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      
      // Parse the raw output containing JSON in markdown code blocks
      const rawOutput = data.raw_output || data;
      const jsonString = rawOutput.replace(/```json|```/g, '').trim();
      const parsedData = JSON.parse(jsonString);
      
      setResult(parsedData);
    } catch (err) {
      console.error("Error analyzing:", err);
      setError("Failed to analyze. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black relative overflow-hidden">
      
      {/*navbar*/}
      <Navbar />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </motion.div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10 pt-24 p-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <motion.h1
            className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Industry Gap Analyzer For Youth Unemployment
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Transform your career with intelligent CV analysis
          </motion.p>
        </motion.div>

        {/* Main Form Card */}
        <motion.div
          className="bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-500/20 overflow-hidden mb-8"
          variants={cardVariants}
          whileHover="hover"
        >
          <motion.div
            className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center">
              <motion.div
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              >
                <Zap className="w-8 h-8 text-white mr-3" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold text-white">Upload & Analyze</h2>
                <p className="text-white/80 mt-2">Get instant AI-powered insights on your CV alignment</p>
              </div>
            </div>
          </motion.div>

          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* CV Upload Section */}
              <motion.div
                className="space-y-4"
                variants={itemVariants}
              >
                <label className="block text-sm font-semibold text-white mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Upload Your CV
                </label>
                <div className="relative group">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="cv-upload"
                    required
                  />
                  <motion.label
                    htmlFor="cv-upload"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-green-500/30 rounded-2xl cursor-pointer hover:border-green-400 hover:bg-green-500/10 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Upload className="w-12 h-12 text-white/60 group-hover:text-green-400 mb-3 transition-all duration-300" />
                    </motion.div>
                    <span className="text-white/70 group-hover:text-white transition-colors duration-300 text-center">
                      {cvFile ? cvFile.name : "Click to upload PDF or DOCX"}
                    </span>
                  </motion.label>
                </div>
                <AnimatePresence>
                  {cvFile && (
                    <motion.div
                      className="flex items-center text-sm text-white bg-green-500/20 px-4 py-3 rounded-xl border border-green-500/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      <span className="font-medium">{cvFile.name} uploaded successfully</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Job Description Section */}
              <motion.div
                className="space-y-4"
                variants={itemVariants}
              >
                <label className="block text-sm font-semibold text-white mb-3 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Job Description
                </label>
                <motion.textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={7}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-green-500/20 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none text-white placeholder-gray-400 backdrop-blur-sm"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  required
                />
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              className="mt-8 text-center"
              variants={itemVariants}
            >
              <motion.button
                onClick={handleSubmit}
                disabled={isLoading}
                className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white font-bold rounded-2xl hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 focus:ring-4 focus:ring-green-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      variants={loadingVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <Loader2 className="w-6 h-6 mr-3" />
                    </motion.div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Star className="w-6 h-6 mr-3" />
                    Analyze with AI
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="bg-red-500/20 border border-red-500/50 rounded-2xl p-4 mb-6 flex items-center backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
              <span className="text-red-300">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Loading State */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              className="bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-500/20 p-8 text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6"
                variants={pulseVariants}
                initial="initial"
                animate="animate"
              >
                <motion.div
                  variants={loadingVariants}
                  initial="initial"
                  animate="animate"
                >
                  <Loader2 className="w-10 h-10 text-white" />
                </motion.div>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">Processing Your Documents</h3>
              <motion.p
                className="text-gray-300 mb-4"
                key={progressStage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {progressStage}
              </motion.p>
              <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                  variants={progressBarVariants}
                  initial="initial"
                  animate="animate"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.2 }}
            >
              {/* Matched Skills */}
              <motion.div
                className="bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-500/20 overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 relative overflow-hidden"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center relative z-10">
                    <motion.div
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white mr-4" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Matched Skills</h3>
                      <p className="text-green-100">Skills that perfectly align with the job requirements</p>
                    </div>
                  </div>
                </motion.div>
                <div className="p-6">
                  {result.matched?.length > 0 ? (
                    <motion.div
                      className="grid md:grid-cols-2 gap-3"
                      variants={staggerContainerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {result.matched.map((item, idx) => (
                        <motion.div
                          key={`match-${idx}`}
                          className="flex items-center bg-green-500/20 px-4 py-3 rounded-xl border border-green-500/30 hover:bg-green-500/30 transition-all duration-300 cursor-pointer"
                          variants={skillItemVariants}
                          whileHover="hover"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400 mr-3" />
                          <span className="text-white font-medium">{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">No matches found</p>
                  )}
                </div>
              </motion.div>

              {/* Missing Skills */}
              <motion.div
                className="bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-500/20 overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 p-6 relative overflow-hidden"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center relative z-10">
                    <motion.div
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <TrendingUp className="w-10 h-10 text-white mr-4" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">Growth Opportunities</h3>
                      <p className="text-gray-100">Skills to develop for career advancement</p>
                    </div>
                  </div>
                </motion.div>
                <div className="p-6">
                  {result.missing?.length > 0 ? (
                    <motion.div
                      className="grid md:grid-cols-2 gap-3"
                      variants={staggerContainerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {result.missing.map((item, idx) => (
                        <motion.div
                          key={`missing-${idx}`}
                          className="flex items-center bg-gray-600/20 px-4 py-3 rounded-xl border border-gray-500/30 hover:bg-gray-600/30 transition-all duration-300 cursor-pointer"
                          variants={skillItemVariants}
                          whileHover="hover"
                        >
                          <TrendingUp className="w-5 h-5 text-gray-400 mr-3" />
                          <span className="text-white font-medium">{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">No missing skills identified</p>
                  )}
                </div>
              </motion.div>

              {/* Improvement Suggestions */}
              <motion.div
                className="bg-gray-800/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-green-500/20 overflow-hidden"
                variants={cardVariants}
                whileHover="hover"
              >
                <motion.div
                  className="bg-gradient-to-r from-lime-600 via-green-600 to-emerald-600 p-6 relative overflow-hidden"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center relative z-10">
                    <motion.div
                      variants={pulseVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <Lightbulb className="w-10 h-10 text-white mr-4" />
                    </motion.div>
                    <div>
                      <h3 className="text-3xl font-bold text-white">AI Recommendations</h3>
                      <p className="text-lime-100">Personalized strategies to boost your profile</p>
                    </div>
                  </div>
                </motion.div>
                <div className="p-6">
                  {result.suggestions?.length > 0 ? (
                    <motion.div
                      className="space-y-4"
                      variants={staggerContainerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {result.suggestions.map((item, idx) => (
                        <motion.div
                          key={`suggestion-${idx}`}
                          className="flex items-start bg-green-500/20 p-4 rounded-xl border border-green-500/30 hover:bg-green-500/30 transition-all duration-300 cursor-pointer"
                          variants={skillItemVariants}
                          whileHover="hover"
                        >
                          <Lightbulb className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-white leading-relaxed">{item}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">No suggestions available</p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/*footer*/}
      <Footer />
    </div>
  );
}