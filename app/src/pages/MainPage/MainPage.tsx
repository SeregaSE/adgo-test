import { FC } from 'react';
import { RequestForm } from '../../components/RequestForm/RequestForm';

export const MainPage: FC = () => {
  return (
    <main className="MainPage">
      <RequestForm />
    </main>
  );
};
