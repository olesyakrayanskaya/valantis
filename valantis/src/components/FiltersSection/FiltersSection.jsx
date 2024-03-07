import classes from './FiltersSection.module.css';
import { memo } from 'react';

function FiltersSection({children}) {
  return (
    <section className={classes.Filters}>{children}</section>
  );
}

export default memo(FiltersSection);