import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';

const CounterFeature = props => {
    const dispatch = useDispatch();
    // get state from redux with useSelector
    const counter = useSelector(state => state.counter) 

    const handleIncreaseClick = () => {
        const action = increase(); //action creator
        dispatch(action);
    }
    const handleDecreaseClick = () => {
        const action = decrease(); //action creator
        dispatch(action);
    }
    return (
        <div>
            Counter: {counter}
            <div>
                <button onClick={handleIncreaseClick}>Increase</button>
                <button onClick={handleDecreaseClick}>Decrease</button>
            </div>
        </div>  
    )
}

export default CounterFeature
