'use client'

import React, { useState, useEffect, useRef, forwardRef, useMemo, memo, ForwardedRef, createRef } from "react";
import DatePicker, { registerLocale }  from 'react-datepicker';
import enGB from 'date-fns/locale/en-GB';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarCustomInput from "./calendar-custom-input";

registerLocale('en-gb', enGB);


interface DatePickerInputProps {
  value: Date,
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
    
  const [startDate, setStartDate] = useState(value || new Date());
  const [buttonValue, setButtonValue] = useState<string | undefined>(formatButtonValue(startDate));

  // const CustomButtonInput = forwardRef(({ 
  //   onClick, value: Date }: CustomButtonInputProps, 
  //   ref) => (
  //   <CalendarCustomInput onClick={onClick} value={value} forwardedRef={ref} />
  // ));

  // CustomButtonInput.displayName = "CustomButtonInput";


  // const ref = createRef<HTMLInputElement>();

  // const CustomButtonInput = useMemo(() => 
  //   forwardRef<HTMLInputElement, unknown>(({ ...rest }) => (
  //         <CalendarCustomInput onClick={onclick} value={value} ref={ref} />
  //   )), [] )
  
  // const CustomButtonInput = forwardRef((props, ref) => {
  //   const shadowProps = props as CustomButtonInputProps;
  //   const shadowRef = ref as ForwardedRef<HTMLButtonElement>; // Or `HtmlInputElement`, or anything you need 
  //   return (
  //   <CalendarCustomInput onClick={onclick} value={value} ref={ref} />
  //   );
  // });

  // const ref = createRef<HTMLInputElement>();  
  // CustomButtonInput.displayName = "CustomButtonInput";

  interface CustomButtonInputProps {
    value: Date;
    onClick: () => void;
  }

  // const CustomButtonInput = useMemo(() => 
  // forwardRef<HTMLInputElement, CustomButtonInputProps>(function Search({ value, onClick }, ref) {
  //   return <CalendarCustomInput onClick={onClick} value={value} ref={ref} />;
  // }), []
  // )
  
  const CustomButtonInput: React.FC<CustomButtonInputProps> = ({ value, onClick }) => {
    return (
      <CalendarCustomInput onClick={onClick} value={value} />
    );
  };

  

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
  <div>
      <label>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => handleDateChange(date)}
            locale="en-gb"
            // customInput={<CustomButtonInput />}
          />
      </label>
  </div>
  );

}

export default DatePickerInput