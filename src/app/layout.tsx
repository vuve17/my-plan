'use client'

import './index.css';
import { Open_Sans } from "next/font/google"; 
import { ReduxProvider } from "./redux/provider";


const openSans = Open_Sans({
    subsets: ["latin"],
})

export const dynamic = 'force-dynamic'

const metadata = {
  title: 'MyPlan',
  description: 'A good day starts with a good plan',
}



 
export default function Layout({ 
  children
 }: {
   children: React.ReactNode
 }) {
  return (
    <html lang="en">
      <body>      
          <ReduxProvider>              
              <div >{children}</div>
          </ReduxProvider>

      </body>
    </html>
  );
}


{/* <div className={`flex h-screen flex-col md:flex-row md:overflow-hidden ${openSans.className}`}> */}
