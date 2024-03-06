import classes from './Input.module.css';

function Input(props) {
    return (
        <>
            <label className={classes.Input__label} htmlFor={props.htmlFor}>{props.text}</label>
            <input className={classes.Input} {...props}></input>
        </>
    );
}

export default Input;
