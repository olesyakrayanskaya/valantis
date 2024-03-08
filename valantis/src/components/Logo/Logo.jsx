import classes from './Logo.module.css';
import flower from '../../assets/images/flower.svg';
import { memo } from 'react';

function Logo(src) {
    return <img className={classes.Logo} src={flower} alt='logo'/>;
}

export default memo(Logo);