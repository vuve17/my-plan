'use client'

import DatePicker, { registerLocale } from 'react-datepicker';
import { Box } from '@mui/material';
import React, { useState, useEffect} from 'react';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';
import { PreviousArrow, NextArrow } from './calendar-navigation-arrows';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setSelectedDate } from '@/app/redux/selected-date-slice';

export const dynamic = 'force-dynamic'

registerLocale('en-gb', enGB);


const containerWidth = {
  xl: "20%",
  lg: "30%",
  md: "100%",
  sm: "100%", 
  xs: "100%"  
};

const containerHeight = {
  md: "calc(100vh - 80px)",
  sm: "100%",
}


const mobileContainerStyle = {
  top: 0,
  right: 0,
  position: "fixed",
}

const SidebarCalendars:React.FC = () => {

  const dispatch = useDispatch();
  const isMobile = useSelector((state : RootState) => state.screen.isMobile)
  const selectedDate = useSelector((state: RootState) => state.selectedDate.selectedDate)
  const [date, setDate] = useState<Date | null>(new Date(selectedDate));
  const visibleMonths = isMobile ? 12 : 2;
  const [checkNavIconClass, setCheckNavIconClass] = useState<boolean>(false)
  const minDate = new Date()
  const maxDateNumber: number = isMobile ? 24 : 12
  const maxDate = new Date(minDate.setMonth(minDate.getMonth() + maxDateNumber))

    const setNewDate = (newDate : Date | null) => {
      if(newDate)
      {
        setDate(newDate)
        const dateToIsoStirng = newDate.toISOString()
        dispatch(setSelectedDate(dateToIsoStirng))
      } 
    }

    useEffect(() => {
      if (date?.toISOString() !== selectedDate) {
        setDate(new Date(selectedDate));
      }
    }, [selectedDate]);

    useEffect(() => {
      const nextButtonSpan = document.querySelector(' .react-datepicker__navigation-icon--next');
      const prevButtonSpan = document.querySelector(' .react-datepicker__navigation-icon--previous');
      const nextButton = document.querySelector('.react-datepicker__navigation--next')
      const prevButton = document.querySelector('.react-datepicker__navigation--previous')
  
      nextButtonSpan?.classList.remove('react-datepicker__navigation-icon')
      prevButtonSpan?.classList.remove('react-datepicker__navigation-icon')
    
      if(isMobile){
        console.log("prevButtonSpan", prevButtonSpan )
        console.log("nextButtonSpan", nextButtonSpan )
        nextButton?.classList.add('hidden')
        prevButton?.classList.add('hidden')
      }
      else {
        console.log("else")
        nextButton?.classList.remove('hidden')
        prevButton?.classList.remove('hidden')
      }
    
    }, [checkNavIconClass, isMobile])

    return (

      <Box
      className='vertical-datepicker-container'
      sx={{
        position: "relative", 
        display: 'flex',
        flexDirection: 'column',
        overflow: isMobile ? "auto" : "hidden",
        width: {
          ...containerWidth
        },
        height: {
          ...containerHeight
        },
        zIndex: 50,
        bottom: 0,
        left: 0,


      }}
      >
        <DatePicker
          selected={date}
          onChange={(date) => setNewDate(date)}
          monthsShown={visibleMonths}
          inline
          locale="en-gb"
          calendarClassName='datepicker-sidebar'
          previousMonthButtonLabel={<PreviousArrow/>}
          nextMonthButtonLabel={<NextArrow/>}
          minDate={new Date()}
          maxDate={maxDate}
          // pogledti jel treba setCheckNavIconClass
          onMonthChange={() => setCheckNavIconClass(!checkNavIconClass)}
          
        />
      </Box>
    );
  };

export default SidebarCalendars
