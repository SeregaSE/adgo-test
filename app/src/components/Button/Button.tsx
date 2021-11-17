import { FC, MouseEventHandler } from 'react';
import classNames from 'classnames';

import './Button.css';

export type ButtonProps = {
  onClick?: MouseEventHandler;
  pressed?: boolean;
  small?: boolean;
  white?: boolean;
  bordered?: boolean;
  prev?: boolean;
  next?: boolean;
  disabled?: boolean;
};

export const Button: FC<ButtonProps> = ({
  children,
  onClick,
  pressed = false,
  small = false,
  white = false,
  bordered = true,
  prev = false,
  next = false,
  disabled = false,
}) => {
  const buttonClasses = classNames('Button', {
    Button_pressed: pressed,
    Button_small: small,
    Button_white: white,
    Button_noBorder: !bordered,
    Button_prev: prev,
    Button_next: next,
    Button_disabled: disabled,
  });

  return (
    <button className={buttonClasses} onClick={onClick} disabled={pressed || disabled}>
      {children}
    </button>
  );
};
