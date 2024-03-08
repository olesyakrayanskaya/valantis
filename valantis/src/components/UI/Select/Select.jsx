import classes from './Select.module.css';
import { memo } from 'react';

function Select({ options, onChange, value, id, labelText }) {
    return (
        <>
            <label className={classes.Select__label} htmlFor={id}>{labelText}&nbsp;</label>
            <select
                id={id}
                className={classes.Select}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <option value={option.value} key={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
        </>
    );
}

export default memo(Select);
