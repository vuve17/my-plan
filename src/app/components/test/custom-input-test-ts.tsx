import DatePicker from 'react-datepicker';
import React, { useState } from 'react';
import CalendarCustomInput from '../calendar/calendar-custom-input';

interface CustomButtonProps {
  value?: Date ;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ value, onClick }) => {
  return (
    <div className="input-group">
      {/* <CalendarCustomInput onClick={onClick} value={value} /> */}
    </div>
  );
};

const CustomTestInput: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="app">
      <label>
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date as Date)}
          customInput={<CustomButton />}
        />
      </label>
    </div>
  );
};

export default CustomTestInput;
