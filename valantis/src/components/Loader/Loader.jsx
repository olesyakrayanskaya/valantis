import classes from './Loader.module.css';
import { memo } from 'react';

function Loader() {
    return <div className={classes.Loader}></div>;
}

export default memo(Loader);
