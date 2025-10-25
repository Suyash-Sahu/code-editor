import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gradient-to-r from-[#256DA4]/5 to-[#83B7DE]/5 dark:from-[#256DA4]/10 dark:to-[#83B7DE]/10 border-t border-[#83B7DE]/20 dark:border-[#74FF9E]/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400 justify-center">
              <span className="bg-gradient-to-r from-[#256DA4] to-[#83B7DE] dark:from-[#83B7DE] dark:to-[#74FF9E] bg-clip-text text-transparent">© {new Date().getFullYear()} Codyn IDE</span>. All rights reserved.
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer