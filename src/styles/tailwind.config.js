module.exports = {
  // ... otras configuraciones
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        }
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite linear'
      }
    }
  }
} 