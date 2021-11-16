import { FC } from 'react';

import './Button.css';

export const Button: FC = ({ children }) => {
  return <button className="Button">{children}</button>;
};
