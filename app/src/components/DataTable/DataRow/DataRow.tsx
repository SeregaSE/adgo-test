import { FC } from 'react';
import classNames from 'classnames';

import './DataRow.css';

export type DataRowProps = {
  data: string[];
  title?: boolean;
};

export const DataRow: FC<DataRowProps> = ({ data, title = false }) => {
  const dataRowItemClasses = classNames('DataRow__item', { DataRow__columnTitle: title });

  return (
    <ul className="DataRow">
      {data.map((el, i) => (
        <li key={`${i}_${el}`} className={dataRowItemClasses}>
          {el}
        </li>
      ))}
    </ul>
  );
};
