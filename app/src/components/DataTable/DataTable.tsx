import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { StatisticsDataType } from '../../store/store.types';
import { DataRow } from './DataRow/DataRow';

import './DataTable.css';
import { PaginationButtons } from './PaginationButtons/PaginationButtons';

export const DataTable: FC = () => {
  const form = useSelector((state: RootState) => state.form);
  const groups = useSelector((state: RootState) => state.groups);
  const [groupBy, setGroupBy] = useState(form.groupBy);
  const [limit, setLimit] = useState(form.limit);
  const statistics = useSelector((state: RootState) => state.statistics);

  useEffect(() => {
    setGroupBy(form.groupBy);
    setLimit(form.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statistics]);

  const headers = () => [
    '№',
    groups.filter((el) => el.value === groupBy)[0]?.label || 'Day',
    'Impressions',
    'Conversions',
    'Money',
  ];

  const numberOfPages = Math.ceil(statistics.count / Number(limit));

  return (
    <div className="DataTable">
      <DataRow data={headers()} title={true} />
      {statistics.rows.map((data, i) => {
        const isDataKey = (key: string): key is keyof StatisticsDataType =>
          data.hasOwnProperty(key);

        const groupTitle = isDataKey(groupBy) ? data[groupBy] : '';

        const dataArray = [
          (form.offset * Number(limit) + i + 1).toString(),
          groupTitle.toString(),
          data.impressions.toString(),
          data.clicks.toString(),
          data.money.toString(),
        ];

        return <DataRow data={dataArray} key={dataArray.join('-')} />;
      })}
      {Array(Math.max(0, Number(limit) - statistics.rows.length))
        .fill('')
        .map((_, i) => (
          <p key={`empty_${i}`} className="DataTable__emptyRow"></p>
        ))}
      <PaginationButtons pages={numberOfPages} />
    </div>
  );
};
