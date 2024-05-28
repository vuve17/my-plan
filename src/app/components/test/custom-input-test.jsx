import DatePicker from 'react-datepicker';
import React, {useState, forwardRef} from 'react';
import { setConfig } from 'next/config';

export const dynamic = 'force-dynamic'


const CustomButton = forwardRef(({ value, onClick }, ref) => {
    return (
            <input
                style={{
                    padding: "8px",
                    width: "70px",
                    backgroundColor: "blue",
                    color: 'white',
                    borderRadius: "6%",
                    border: "0px",
                    fontWeight: "600"
                }}
                type="text"
                defaultValue={value}
                onClick={onClick}
                ref={ref}
            />
    );
});

CustomButton.displayName = "customDatePickerButton"

const CustomTestInput = () => {
    const [date, setDate] = useState(new Date());
    const [dateDb, setDateFromDb] = useState("");


    async function insertDateInDb (date) {
        console.log( typeof date, date)
        try{
        const response = await fetch('/api/date-task', {
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
            setDateFromDb("done")
        }
        }
        catch(error)
        {
            setDateFromDb(error)
        }
    }

    return(
        <div>
        <DatePicker
        selected={date}
        onChange={date => setDate(date)}
        customInput={<CustomButton/>}
        minDate={new Date()}
        />

        <div>{dateDb}</div>


        </div>
    )
}


export default CustomTestInput