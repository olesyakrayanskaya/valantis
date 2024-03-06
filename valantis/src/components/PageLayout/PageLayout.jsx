import classes from './PageLayout.module.css';

function PageLayout({ children }) {
    return <div className={classes.PageLayout}>{children}</div>;
}

export default PageLayout;
