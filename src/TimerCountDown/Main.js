import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import {
    SetLocalStorage,
    GetLocalStorage,
    TimeToDigit,
    TimeToString,
} from '../helpers/helpers.js';
import sound from '../audio/mixkit-modern-technology-select-3124.wav';

export default function Main() {

    const [timerValue, setTimerValue] = useState('00:00:00');
    const [time, setTime] = useState(0);
    const [timeArr, setTimeArr] = useState(GetLocalStorage('timerCountdownArr'));
    const [start, setStart] = useState(false);
    const [play] = useSound(sound);

    const Stop = ()=>{
        play();
        if(start) AddTime(time);
        setTime(0);
        setStart(false);
    }
    const Start = ()=>{
        play();
        const t = TimeToDigit(timerValue);
        
        if(t > 0 && time <= 0) setTime(t);
        else if(t <= 0 || time <= 0){
            alert('Set time');
            return;
        }
        setStart(!start);
        if(start) AddTime(time);
    }
    const Reset = ()=>{
        play();
        setTimerValue('00:00:00');
        setStart(false);
        setTime(0);
        setTimeArr([]);
        SetLocalStorage('timerCountdownArr');
    }
    const AddTime = (time)=>{
        let arr = [...timeArr];
            arr.push(TimeToString(time));
            setTimeArr(arr);
            SetLocalStorage('timerCountdownArr', arr);
    }
    const setTimes = (val, el)=>{
        const time = TimeToDigit(val);
        setTimerValue(TimeToString(time, el));
        setTime(time);
    }

    useEffect(()=>{
        if(time <= 0 && start) {
            setStart(false);
            setTimeout(()=>{
                setTime(0);
                alert('Time is over!!!');
            }, 0);
        }
    }, [time, start]);

    useEffect(()=>{

        let timer = null;

        if(start){
            timer = setInterval(()=>setTime(time=>time-11), 11);
        }else{
            clearInterval(timer)
            timer = null;
        }
        
        return ()=>{
            clearTimeout(timer);
            timer = null;
        }
    }, [start]);

    return (
    <div className='container'>
        <h2>Timer countdown</h2>
        <input
            className='setTime'
            type='time'
            step='1'
            onChange={(e)=>{
                if(!start) setTimes(e.target.value, true);
            }}
            value={timerValue}
        />
        <div className='timer'>
            <h3>{TimeToString(time)}</h3>
            <div className='buttons'>
                <button className={(!start) ? 'start' : 'continue'} onClick={Start}>
                    {(!start) ? 'Start' : 'Continue'}
                </button>
                <button className='stop' onClick={Stop}>Stop</button>
                <button className='reset' onClick={Reset}>Reset</button>
            </div>
            <div className='times_array'>
                {timeArr.map((el)=><span key={el}>{el}</span>)}
            </div>
        </div>
    </div>
    );
  }
