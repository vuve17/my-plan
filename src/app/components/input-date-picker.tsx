'use client'

import React, { useState, useEffect, useRef, forwardRef, useMemo, memo } from "react";
import DatePicker, { registerLocale }  from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css'

registerLocale('en-gb', enGB);

interface CustomInputButtonProps {
  stringValue: string|undefined ,
  onClick?: () => void,
}

interface DatePickerInputProps {
  value?: string|Date,
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

// const CustomInputButton: React.FC<CustomInputButtonProps> = React.memo(
//   forwardRef<HTMLButtonElement, CustomInputButtonProps>(({ stringValue, onClick }, ref) => {
//     const stringValueRef = useRef<string | undefined>(undefined);

//     useEffect(() => {
//       stringValueRef.current = stringValue;
//     }, [stringValue]);

//     return (
//       <button
//         className="example-custom-input"
//         onClick={onClick}
//         ref={ref}
//       >
//         {stringValueRef.current}
//       </button>
//     );
//   })
// );

// const CustomInputButton: React.FC<CustomInputButtonProps> = React.memo(

//   forwardRef<HTMLButtonElement, CustomInputButtonProps>(({ stringValue, onClick }, ref) => (
//     <button className="example-custom-input" onClick={onClick} ref={ref}>
//       {stringValue}
//     </button>
//   ))
// );

const DatePickerInput: React.FC<DatePickerInputProps> = ({ value, onChange }) => {
    
  const [startDate, setStartDate] = useState(value ? new Date() : new Date());
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
      // clearable={false}
      // customInput={<CustomInputButton stringValue={buttonValue}/>}
    />
  );

}

export default DatePickerInput