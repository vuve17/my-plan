'use client'

import DatePicker, { registerLocale } from 'react-datepicker';
import React, { useState, useEffect} from 'react';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css'
import TaskMenu from './task-menu';
import { PreviousArrow, NextArrow } from './calendar-navigation-arrows';

registerLocale('en-gb', enGB);

interface sidebarCalendarsProps {
  className?: string
  device?: boolean
}

const SidebarCalendars:React.FC<sidebarCalendarsProps> = ({...props}) => {

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [visibleMonths, setVisibleMonths] = useState<number>(props.device ? 5 : 3);
  const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(false);


    useEffect(() => {

      const handleScroll = () => {

        if ((window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.8) && props.device) {
          console.log("scroll")
          setVisibleMonths((prevVisibleMonths) => prevVisibleMonths + 5)
          setScrolledToBottom(true)
        }
        else {
          setScrolledToBottom(false);
        }
      };

      console.log(scrolledToBottom)
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [props.device, scrolledToBottom]);

    useEffect(() => {
      const nextButton = document.querySelector(' .react-datepicker__navigation-icon--next');
      const prevButton = document.querySelector(' .react-datepicker__navigation-icon--previous');
      if (nextButton && prevButton) {
        nextButton.removeAttribute('class');
        prevButton.removeAttribute('class');
      }
    }, [])

    return (
      <div className='vertical-datepicker-container'>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          monthsShown={visibleMonths}
          inline
          locale="en-gb"
          calendarClassName='datepicker-sidebar'
          previousMonthButtonLabel={<PreviousArrow/>}
          nextMonthButtonLabel={<NextArrow/>}
        />
        {/* {!props.device ? <TaskMenu /> : null} */}
      </div>
    );
  };

export default SidebarCalendars
