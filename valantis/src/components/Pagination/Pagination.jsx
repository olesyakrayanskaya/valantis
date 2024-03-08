import classes from './Pagination.module.css';
import { memo } from 'react';

function Pagination({ children, ...props }) {
    return (
        <div className={classes.Pagination} {...props}>
            {children}
        </div>
    );
}

export default memo(Pagination);
