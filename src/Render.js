import { useEffect, useState } from 'react';

export default function Render(props){
    
    const [start, setStart] = useState('start');
    const [time, setTime] = useState(0);
    const [timeArr, setTimeArr] = useState([]);

    return (
        <div className='container'>
            <input className='setTime' type='time' step='1' onChange={(e)=>props.timer.TimeToDigit(e)}></input>
            <div className='timer'>
                <h2>{props.timer.TimeToString(time)}</h2>
                <div className='buttons'>
                    <button className={start} onClick={()=>{
                        props.timer.start();
                        console.log(props.timer)
                    }
                        //()=>(start === 'start') ? setStart('continue') : setStart('start')
    
                    }>{start[0].toUpperCase()+start.slice(1, start.length)}</button>
                    <button className='stop' onClick={()=>{
                        
                        console.log(props.timer)
                        props.timer.stop()
                        }}>Stop</button>
                    <button className='reset' onClick={()=>{}}>Reset</button>
                </div>
                <div className='times_array'>{timeArr}</div>
            </div>
        </div>
        );
}