import DatePicker, { registerLocale } from 'react-datepicker';
import React, { useState } from 'react';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css'
import '../index.css'

registerLocale('en-gb', enGB);

interface sidebarCalendarsProps {
  calssName?: string
}

const SidebarCalendars:React.FC<sidebarCalendarsProps> = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());


    return (
      <div className='vertical-datepicker-container'>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          monthsShown={3}
          inline
          locale="en-gb"
          // excludedDates = {excludedMonths}
        />
      </div>
    );
  };

export default SidebarCalendars
