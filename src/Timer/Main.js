import React, { useEffect, useState } from 'react';
import {
    SetLocalStorage,
    GetLocalStorage,
    TimeToString,
} from '../helpers/helpers.js';
import useSound from 'use-sound';
import sound from '../audio/mixkit-modern-technology-select-3124.wav';

export default function Main() {

    const [timerValue, setTimerValue] = useState('00:00:00:00');
    const [time, setTime] = useState(0);
    const [timeArr, setTimeArr] = useState(GetLocalStorage('timerArr'));
    const [start, setStart] = useState(false);
    const [play] = useSound(sound);

    const Stop = ()=>{
        play();
        setStart(false);
        setTimeout(()=>{
            setTimerValue('00:00:00:00');
            setTime(0);
        }, 0);
        if(start) AddTime();
    }
    const Start = ()=>{
        play();
        if(timerValue === '00:00:00:00'){
            setTime(new Date());
        }else{
            if(start) AddTime();
        }
        setStart(!start);
    }
    const Reset = ()=>{
        play();
        setTimerValue('00:00:00:00');
        setStart(false);
        setTime(0);
        setTimeArr([]);
        SetLocalStorage('timerArr');
    }
    const AddTime = ()=>{

        const newtime = new Date();
        
        let arr = [...timeArr];
            arr.push(TimeToString(newtime - time));
            setTimeArr(arr);
            SetLocalStorage('timerArr', arr);
    }

    useEffect(()=>{
        
        const setTimes = ()=>{
            const newtime = new Date();
            setTimerValue(TimeToString(newtime - time));
        }

        let timer = null;

        if(start) timer = setInterval(setTimes, 11);
        else{
            clearInterval(timer);
            timer = null;
        }

        return (()=>{
            clearInterval(timer);
            timer = null;
        });
    }, [start, time]);

    return (
    <div className='container'>
        <h2>Timer</h2>
        <div className='timer'>
            <h3>{timerValue}</h3>
            <div className='buttons'>
                <button className={(!start) ? 'start' : 'continue'} onClick={Start}>
                    {!(start) ? 'Start' : 'Continue'}
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
