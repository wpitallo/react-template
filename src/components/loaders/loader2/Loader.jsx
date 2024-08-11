import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const Loader = ({ height = 60, width = 60 }) => {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    let start = null
    const duration = 1300 // Duration of animation in milliseconds

    function animate(timestamp) {
      if (!start) start = timestamp
      const progress = timestamp - start
      const percentage = (progress % duration) / duration
      const offset = 256.58892822265625 * percentage
      if (svg) {
        const path = svg.querySelector('path')
        if (path) {
          path.setAttribute('stroke-dashoffset', offset)
        }
      }
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      // Cleanup if needed
    }
  }, [])

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width={width} height={height} style={{ shapeRendering: 'auto', display: 'block', maxWidth: `${width}px` }} ref={svgRef}>
      <g>
        <path style={{ transform: 'scale(0.8)', transformOrigin: '50px 50px' }} strokeLinecap="round" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeDasharray="42.76482137044271 42.76482137044271" strokeWidth="8" stroke="#043a0e" fill="none" />
      </g>
    </svg>
  )
}

Loader.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
}

export default Loader
