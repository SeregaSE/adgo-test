import { FC } from 'react';
import { DataTable } from '../../components/DataTable/DataTable';
import { RequestForm } from '../../components/RequestForm/RequestForm';

export const MainPage: FC = () => {
  return (
    <main className="MainPage">
      <RequestForm />
      <DataTable />
    </main>
  );
};
