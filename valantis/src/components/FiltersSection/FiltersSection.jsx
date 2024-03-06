import classes from './FiltersSection.module.css';

function FiltersSection({children}) {
  return (
    <section className={classes.Filters}>{children}</section>
  );
}

export default FiltersSection;