"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <header className="py-6 px-4 sm:px-6 lg:px-8">
        <motion.h1
          className="text-4xl font-bold text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Not Steam
        </motion.h1>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div>
              <h2 className="text-3xl font-semibold mb-4">Welcome to Not Steam</h2>
              <p className="text-gray-300">
                Your ultimate destination for honest and in-depth game reviews. We're passionate about gaming and
                committed to providing you with the most accurate and helpful information to make informed decisions
                about your next gaming adventure.
              </p>
            </div>
            <motion.div
              className="relative h-64 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image src="/placeholder.svg?height=256&width=384" alt="Gaming collage" layout="fill" objectFit="cover" />
            </motion.div>
          </motion.div>
        </section>

        <section className="py-12 bg-gray-800 rounded-lg">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-4">The Power of Game Reviews</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Game reviews are more than just opinions – they're valuable insights that can help you make the most of
              your gaming time and budget. Our expert reviewers provide detailed analysis, performance insights, and
              honest feedback to ensure you have all the information you need before making a purchase.
            </p>
          </motion.div>
        </section>

        <section className="py-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="text-center">
              <motion.div
                className="h-32 w-32 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-4xl">🎮</span>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Latest Reviews</h3>
              <p className="text-gray-300">Stay up-to-date with our latest game reviews and ratings.</p>
            </div>
            <div className="text-center">
              <motion.div
                className="h-32 w-32 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-4xl">📊</span>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Performance Analysis</h3>
              <p className="text-gray-300">Detailed performance breakdowns for various gaming systems.</p>
            </div>
            <div className="text-center">
              <motion.div
                className="h-32 w-32 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-4"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-4xl">💬</span>
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">Community Discussions</h3>
              <p className="text-gray-300">Join the conversation and share your gaming experiences.</p>
            </div>
          </motion.div>
        </section>

        <section className="py-12">
          <motion.div
            className="bg-gray-800 rounded-lg p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-semibold mb-4 text-center">Featured Game of the Week</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=256&width=384"
                  alt="Featured game"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Cyberpunk 2077</h3>
                <p className="text-gray-300 mb-4">
                  An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour
                  and body modification.
                </p>
                <motion.button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read Full Review
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="bg-gray-900 py-6 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; 2025 Not Steam. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

