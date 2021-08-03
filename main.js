const startStop = document.getElementsByClassName("start")[0];
const wait = document.getElementsByClassName("wait")[0];
const reset = document.getElementsByClassName("reset")[0];
const content = document.getElementsByClassName("content")[0];

let timerId = null;
let clickCount = 0;

startStop.addEventListener("click", (e)=>{
    const element = e.path[0];
    if(element.classList[0]=='start'){
        element.classList.toggle('start');
        element.classList.toggle('stop');
        element.innerText = 'Stop';
        timerId = startCounter();
    }else{
        element.classList.toggle('stop');
        element.classList.toggle('start');
        element.innerText = 'Start';
        stopCounter();
    }
});

wait.addEventListener("click", ()=>{
    clickCount++;
    setTimeout(()=>{
        if(clickCount===2){
            if(startStop.classList[0]=='stop'){  
                startStop.classList.toggle('stop');
                startStop.classList.toggle('start');
                startStop.innerText = 'Start';
            }
            waitCounter()
        }
        clickCount = 0;
    },300)
});

reset.addEventListener("click", ()=>{ 
    Reset()
});

const createCounter = () => {
    let counter = 0;
    const Increment = () =>{
        counter++;
        return counter;
    };
    const Reset = () => {
        counter = 0;
        content.innerText = '00:00:00';
        return counter;
    };
    return [Increment, Reset];
}

const [Increment, Reset] = createCounter();

const startCounter = () => {
    return setInterval(()=>{showTimer(Increment())},1000)
}

const waitCounter = () => {
    if(timerId){
        clearInterval(timerId);
    }
}

const stopCounter = () =>{
    waitCounter();
    Reset();
}

const counterToString = (seconds) => {
 return new Date(seconds*1000).toISOString().substr(11,8);
}

const showTimer = (counter) =>{
    content.innerText = counterToString(counter)
}