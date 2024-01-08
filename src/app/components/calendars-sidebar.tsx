'use client'

import DatePicker, { registerLocale } from 'react-datepicker';
import useDeviceSize from '../lib/device-width-size';
import React, { useState, useEffect} from 'react';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css'
import '../index.css'

registerLocale('en-gb', enGB);

interface sidebarCalendarsProps {
  className?: string
}

const SidebarCalendars:React.FC<sidebarCalendarsProps> = () => {


  // const deviceWidth = useDeviceSize()
  // const device = deviceWidth < 576
  const device = window.matchMedia('(max-width: 576px)').matches
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [visibleMonths, setVisibleMonths] = useState<number>(device? 5 : 3);
  const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(false);
    

//  staviti device var u useEffect hook tako se makne error

    const handleScroll = () => {
      if ((window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.8) && device) {
        console.log("scroll")
        setVisibleMonths((prevVisibleMonths) => prevVisibleMonths + 5)
        setScrolledToBottom(true)
      }
      else {
        setScrolledToBottom(false);
      }
    };

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [scrolledToBottom]);


    return (
      <div className='vertical-datepicker-container'>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          monthsShown={visibleMonths}
          inline
          locale="en-gb"
          // excludedDates = {excludedMonths}
        />
      </div>
    );
  };

export default SidebarCalendars
