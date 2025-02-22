import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  // Initial dark mode state from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark'; // If saved theme is dark, return true
  });

  useEffect(() => {
    // Add/remove dark class to the body based on darkMode state
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]); // Run when darkMode changes

  return (
    <div className="App">
      <button 
        onClick={() => setDarkMode(prev => !prev)} // Toggle dark mode
        className="p-2 bg-blue-500 text-white"
      >
        Toggle {darkMode ? 'Light' : 'Dark'} Mode
      </button>

      <div className="card p-4 mt-4 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-black dark:text-white">
        <h2 className="text-lg">Card Title</h2>
        <p>This card adapts to dark/light mode.</p>
      </div>
    </div>
  );
}
export default ThemeToggle;
