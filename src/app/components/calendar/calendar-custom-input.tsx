'use client'
import React from "react";



interface CalendarCustomInputProps {
    value: Date;
    onClick: ((this: Window, ev: MouseEvent) => any) | null
    // ref?: React.ForwardedRef<HTMLInputElement>
}

const formatButtonValue = (date: Date) => {
    if (date) {
        const newDate = new Date(date)
        const formattedDate = newDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).split('/').join('/');
        return formattedDate;
    }
    return "null";
};

const CalendarCustomInput: React.FC<CalendarCustomInputProps> = ({ value, onClick }) => {
    const formattedValue = formatButtonValue(value);

    return (
        <button style={{ backgroundColor: "red" }}
        onClick={() => onClick}
        
        >
            {formattedValue}
        </button>
    );
}

export default CalendarCustomInput;
