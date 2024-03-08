import classes from './Button.module.css';
import { memo } from 'react';

function Button({ children, isActive, ...props }) {
  return (
      <button
          {...props}
          className={
              isActive
                  ? `${classes.Btn} ${classes.Btn_active}`
                  : `${classes.Btn}`
          }
      >
          {children}
      </button>
  );
}

export default memo(Button);