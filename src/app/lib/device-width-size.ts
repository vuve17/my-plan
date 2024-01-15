'use client'

import { useState, useEffect } from "react"

export const useDeviceSize: () => number = () => {

    const [width, setWidth] = useState(window.innerWidth)
  
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
    }
  
    useEffect(() => {
      // component is mounted and window is available
      handleWindowResize();
      window.addEventListener('resize', handleWindowResize);
      // unsubscribe from the event on component unmount
      return () => window.removeEventListener('resize', handleWindowResize);
    }, []);
  
    return width
  
}

export const useRenderOnDeviceWidth = (width: number) => {
  const device = window.matchMedia(`(max-width: ${width}px)`).matches
  return device
}
  
