'use client'

import React, { useState, useEffect, useRef, forwardRef, useMemo, memo, ForwardedRef, createRef } from "react";
import DatePicker, { registerLocale }  from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';
import colors from "@/app/ui/colors";


export const dynamic = 'force-dynamic'

registerLocale('en-gb', enGB);

//redux?

interface DatePickerInputProps {
  value?: Date,
  name?: string,
  onChange: (value: Date) => void,
}

const formatButtonValue = (date: Date) => {
  if (date) {
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).split('/').join('/');

    return formattedDate
  }
};



const CustomButton = forwardRef(({ value, onClick }: any, ref :any) => {


  return (
          <input
              style={{
                  padding: "8px",
                  width: "70px",
                  backgroundColor: colors.primaryBlue,
                  color: 'white',
                  borderRadius: "6%",
                  border: "0px",
                  fontWeight: "600"
              }}
              type="text"
              value={value}
              onClick={onClick}
              ref={ref}
          />
  );
});

CustomButton.displayName = "customDatePickerButton"


const DatePickerInput: React.FC = () => {
    
  const [startDate, setStartDate] = useState(new Date());
  const [buttonValue, setButtonValue] = useState<string | undefined>(formatButtonValue(startDate));
  

  
   async function handleDateChange(date: Date) {
    if(date){
      setStartDate(date);

      setButtonValue(formatButtonValue(date));

      try{
        console.log("frontend date : ", date)
        const newDate = new Date();  
        const response = await fetch('/api/date-test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                date: date
            })
        });

        if(response.ok)
        {
            const responseData = await response.json();
            const datetime = responseData.eventTimeTz;
            console.log(datetime.toISOString());
            console.log("done")
        }
        }
        catch(error)
        {
            if(error)
                {
                    console.log(error)
                }
            
        }
    }
  };

  return (
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => handleDateChange(date)}
            locale="en-gb"
            customInput={<CustomButton />}
            minDate={new Date()}
          />
  );

}

export default DatePickerInput
