import DatePicker from 'react-datepicker';
import React, {useState} from 'react';
import CalendarCustomInput from '../calendar/calendar-custom-input';

export const dynamic = 'force-dynamic'

function CustomButton({value, onClick}){
    return(
        <div className="input-group">
            {/*ovo ne radi */}
            {/* <CalendarCustomInput  onClick={onClick} value={value} /> */}
            {/*ovo ne radi */}
            <input type="text"  style={{backgroundColor: "red"}} defaultValue={value} onClick={onClick} />
        </div>
    )
}


const CustomTestInput = () => {
    const [date, setDate] = useState(new Date());


    return(
        <div className="app">
            <label>
                <DatePicker
                selected={date}
                onChange={date=>setDate(date)}
                customInput={<CustomButton/>}
                
                />
            </label>
        </div>
    )
}


export default CustomTestInput