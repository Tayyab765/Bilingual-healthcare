
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    // Add resize event listener
    window.addEventListener('resize', checkMobile)
    
    // Media query listener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches)
    }
    
    // For modern browsers
    if (mql.addEventListener) {
      mql.addEventListener('change', handleMediaChange)
    } else {
      // Fallback for Safari
      mql.addListener(handleMediaChange)
    }
    
    // Set initial value
    checkMobile()
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile)
      if (mql.removeEventListener) {
        mql.removeEventListener('change', handleMediaChange)
      } else {
        // Fallback for Safari
        mql.removeListener(handleMediaChange)
      }
    }
  }, [])

  return !!isMobile
}
