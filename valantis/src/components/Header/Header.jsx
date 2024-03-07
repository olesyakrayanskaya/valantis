import classes from './Header.module.css';
import { memo } from 'react';

function Header({children}) {
    return (
      <header className={classes.Header}>{children}</header>
    );
}

export default memo(Header);
