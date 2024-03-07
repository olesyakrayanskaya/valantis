import classes from './Input.module.css';
import { memo } from 'react';

function Input(props) {
    return <input className={classes.Input} {...props}></input>;
}

export default memo(Input);
