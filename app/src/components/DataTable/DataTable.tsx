import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { StatisticsDataType } from '../../store/store.types';
import { DataRow } from './DataRow/DataRow';

import './DataTable.css';
import { PaginationButtons } from './PaginationButtons/PaginationButtons';

export const DataTable: FC = () => {
  const form = useSelector((state: RootState) => state.form);
  const groups = useSelector((state: RootState) => state.groups);
  const statistics = useSelector((state: RootState) => state.statistics);

  const headers = [
    '№',
    groups.filter((el) => el.value === form.groupBy)[0]?.label || 'Day',
    'Impressions',
    'Conversions',
    'Money',
  ];

  const numberOfPages = Math.ceil(statistics.count / form.limit);

  return (
    <div className="DataTable">
      <DataRow data={headers} title={true} />
      {statistics.rows.map((data, i) => {
        const isDataKey = (key: string): key is keyof StatisticsDataType =>
          data.hasOwnProperty(key);

        const groupTitle = isDataKey(form.groupBy) ? data[form.groupBy] : '';

        const dataArray = [
          (form.offset * form.limit + i + 1).toString(),
          groupTitle.toString(),
          data.impressions.toString(),
          data.clicks.toString(),
          data.money.toString(),
        ];

        return <DataRow data={dataArray} key={dataArray.join('-')} />;
      })}
      {Array(form.limit - statistics.rows.length)
        .fill('')
        .map((el, i) => (
          <p key={`empty_${i}`} className="DataTable__emptyRow"></p>
        ))}
      <PaginationButtons pages={numberOfPages} />
    </div>
  );
};
