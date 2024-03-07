import classes from './PageLayout.module.css';
import { memo } from 'react';

function PageLayout({ children }) {
    return <div className={classes.PageLayout}>{children}</div>;
}

export default memo(PageLayout);
