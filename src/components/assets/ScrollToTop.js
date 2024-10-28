import React, { useState, useEffect } from 'react';

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div 
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            cursor: 'pointer',
            zIndex: '1000',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#008080', // Color teal
            borderRadius: '50%',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#DAA520'} // Color dorado al pasar el mouse
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#008080'} // Volver a teal al quitar el mouse
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5L5 12H9V19H15V12H19L12 5Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </>
  );
}

export default ScrollToTop;
