'use client'

import React, { useState, useEffect, useRef, forwardRef, useMemo, memo, ForwardedRef, createRef } from "react";
import DatePicker, { registerLocale }  from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarCustomInput from "./calendar-custom-input";
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

  // console.log("value: ", value)
  // console.log("type: ", typeof(value))

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


const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, onChange }) => {
    
  const [startDate, setStartDate] = useState(value || new Date());
  const [buttonValue, setButtonValue] = useState<string | undefined>(formatButtonValue(startDate));
  

  useEffect(() => {
    if (value) {
        setStartDate(new Date(value));
    }
  }, [value]);
  
  const  handleDateChange = (date: Date) => {
    if(date){
      setStartDate(date);

      setButtonValue(formatButtonValue(date));
      onChange && onChange(date);
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
