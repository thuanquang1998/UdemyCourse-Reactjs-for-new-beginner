import React, {useState, useEffect, useRef} from 'react'

const Clock = () => {
   const [timeString, setTimeString] = useState(null)
   const intervalRef = useRef(null);

    useEffect(()=> {
        intervalRef.current = setInterval(()=> {
            const now = new Date();
            const hours = `0${now.getHours()}`.slice(-2);
            const minutes = `0${now.getMinutes()}`.slice(-2);
            const seconds = `0${now.getSeconds()}`.slice(-2);
            const currentTimeString = `${hours}:${minutes}:${seconds}`;

            setTimeString(currentTimeString);
        }, 1000);
        console.log("aaaaaaa");

        return () => {
            clearInterval(intervalRef.current);
        }
    },[])

    // useEffect with lifecycle
    // useEffect (() => {
    //     console.log("Component Did Mount")
    //     return () => {
    //         console.log("Component Will Unmount");
    //     }
    // },[])
    // useEffect (() => {
    //     console.log("Component Did Mount or Did Update");
    // });
    
    return (
        <div style={{ fontSize: "48px" }}>{ timeString }</div>
    )
    }



export default Clock
