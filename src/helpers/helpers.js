const GetLocalStorage = (val)=>{
    const timerArr = localStorage.getItem(val);
    
    if(!timerArr || timerArr === 'undefined') return [];
    return JSON.parse(timerArr);
}
const SetLocalStorage = (val, arr)=>{
    (arr) ?
        localStorage.setItem(val, JSON.stringify(arr)) :
        localStorage.removeItem(val);
}
const TimeToString = (val, to)=>{

    const hours = Math.floor((val / (1000 * 3600)) % 24);
    const minutes = Math.floor((val / 1000 / 60) % 60);
    const seconds = Math.floor((val / 1000) % 60);
    const miliseconds = Math.floor(val % 1000);
    
    const strHours = `${(hours.toString().length === 1) ? `0${hours}` : hours}`;
    const strMinutes = `${(minutes.toString().length === 1) ? `0${minutes}`: minutes}`;
    const strSeconds = `${(seconds.toString().length === 1) ? `0${seconds}`: seconds}`;
    const strMiliseconds = `${(miliseconds.toString().length === 1) ? `0${miliseconds}`: miliseconds}`;
    
    return (!to) ? 
        `${strHours}:${strMinutes}:${strSeconds}:${strMiliseconds}` : 
        `${strHours}:${strMinutes}:${strSeconds}`;
}
const TimeToDigit = (val)=>{

    return val.split(':').reduce((acc, curval, index, arr)=>{
        
        if(arr.length === 1) {
            return acc+(+curval * 3600);
        }
        if(arr.length === 2) {
            if(index === 0) return acc+(+curval * 3600);
            if(index === 1) return acc+(+curval * 60);
        }
        if(arr.length === 3) {
            if(index === 0) return acc+(+curval * 3600);
            if(index === 1) return acc+(+curval * 60);
            if(index === 2) return acc+(+curval);
        }
        return acc;
    }, 0) * 1000;
}

export {
    SetLocalStorage,
    GetLocalStorage,
    TimeToDigit,
    TimeToString,
}