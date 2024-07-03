'use client'

import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/navbar-private';
import '../index.css';
import { Open_Sans } from "next/font/google"; 
import { ReduxProvider } from '../redux/provider';
import { setIsMobile } from '../redux/screen-1500-slice';
import { RootState } from "../redux/store"; 

const openSans = Open_Sans({
    subsets: ["latin"],
})

export const dynamic = 'force-dynamic'

const metadata = {
  title: 'MyPlan',
  description: 'A good day starts with a good plan',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const isDevice1500 = useSelector((state: RootState) => state.screen.isMobile);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setIsMobile(window.innerWidth <= 1200));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);



  return (
    <>
      <ReduxProvider>
        
        <NavBar deviceSmall={isDevice1500}/>
        <div>{children}</div>
      </ReduxProvider>
    </>
  );
}

















// 'use client'

// import NavBar from '../components/navbar-private';
// import '../index.css';
// import { Open_Sans } from "next/font/google"; 
// import { ReduxProvider } from '../redux/provider';


// const openSans = Open_Sans({
//     subsets: ["latin"],
// })

// export const dynamic = 'force-dynamic'

// const metadata = {
//   title: 'MyPlan',
//   description: 'A good day starts with a good plan',
// }



 
// export default function Layout({ 
//   children
//  }: {
//    children: React.ReactNode
//  }) {
//   return (   
//             <>
//               <ReduxProvider>
//               <NavBar />
//                   <div >{children}</div>
//               </ReduxProvider>
//             </>
//   );
// }