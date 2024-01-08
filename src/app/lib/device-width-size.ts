import { useState, useEffect } from "react"

const useDeviceSize: () => number = () => {

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
  
export default useDeviceSize 