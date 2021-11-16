import { FC } from 'react';

import { Button } from '../Button/Button';
import { DateInput } from '../DateInput/DateInput';
import { MultipleSelect } from '../MultipleSelect/MultipleSelect';
import { Select } from '../Select/Select';

import './RequestForm.css';

const groups = [
  {
    label: 'Day',
    value: 'day',
  },
  {
    label: 'Platform',
    value: 'platform',
  },
];

const os = [
  {
    label: 'Windows',
    value: 1,
    platform: 1,
  },
  {
    label: 'Mac OS',
    value: 2,
    platform: 1,
  },
];

const browsers = [
  {
    label: 'Chrome',
    value: 1,
    platform: 1,
  },
  {
    label: 'Firefox',
    value: 2,
    platform: 1,
  },
];

const platforms = [
  {
    label: 'Desktop',
    value: 1,
  },
  {
    label: 'Mobile',
    value: 2,
  },
];

export const RequestForm: FC = () => {
  return (
    <form className="RequestForm">
      <fieldset className="RequestForm__fieldset">
        <div className="RequestForm__field">
          <label>From</label>
          <DateInput />
        </div>
        <div className="RequestForm__field">
          <label>To</label>
          <DateInput />
        </div>
        <div className="RequestForm__field">
          <label>Group by</label>
          <Select options={groups} />
        </div>
        <Button>Применить</Button>
      </fieldset>
      <fieldset className="RequestForm__fieldset">
        <div className="RequestForm__field">
          <label>Platform</label>
          <MultipleSelect options={platforms} />
        </div>
        <div className="RequestForm__field">
          <label>Operating system</label>
          <MultipleSelect options={os} />
        </div>
        <div className="RequestForm__field">
          <label>Browser</label>
          <MultipleSelect options={browsers} />
        </div>
      </fieldset>
    </form>
  );
};
