import classes from './Input.module.css';

function Input(props) {
    return <input className={classes.Input} {...props}></input>;
}

export default Input;
