import React, { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  getBrowsers,
  getGroups,
  getOperatingSystems,
  getPlatforms,
  getStatistics,
} from '../../store/thunk';

import { Button } from '../Button/Button';
import { DateInput } from '../DateInput/DateInput';
import { MultipleSelect } from '../MultipleSelect/MultipleSelect';
import { Select } from '../Select/Select';

import './RequestForm.css';

const limits = [
  { value: 10, label: '10' },
  { value: 25, label: '25' },
];

export const RequestForm: FC = () => {
  const dispatch = useDispatch();

  const platforms = useSelector((state: RootState) => state.platforms);
  const browsers = useSelector((state: RootState) => state.browsers);
  const operatingSystems = useSelector((state: RootState) => state.operatingSystems);
  const groups = useSelector((state: RootState) => state.groups);

  const [form, setForm] = useState(useSelector((state: RootState) => state.form));
  const requestForm = useRef<HTMLFormElement>(null);

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getOperatingSystems());
    dispatch(getBrowsers());
    dispatch(getGroups());
  }, [dispatch]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(getStatistics({ ...form, offset: 0 }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <form className="RequestForm" ref={requestForm} onSubmit={handleSubmit}>
      <fieldset className="RequestForm__fieldset">
        <div className="RequestForm__field">
          <label>From</label>
          <DateInput
            name="from"
            required={true}
            value={form.from}
            onChange={handleChange}
            maxValue={form.to}
          />
        </div>
        <div className="RequestForm__field">
          <label>To</label>
          <DateInput
            name="to"
            required={true}
            value={form.to}
            onChange={handleChange}
            minValue={form.from}
          />
        </div>
        <div className="RequestForm__field">
          <label>Group by</label>
          <Select
            options={groups}
            name="groupBy"
            value={form.groupBy}
            onChange={handleChange}
            required={true}
          />
        </div>
        <Button>Save and get statistics</Button>
      </fieldset>
      <fieldset className="RequestForm__fieldset">
        <div className="RequestForm__field">
          <label>Platform</label>
          <Select
            options={platforms}
            name="platform"
            value={form.platform?.toString()}
            onChange={handleChange}
            emptyValue={true}
          />
        </div>
        <div className="RequestForm__field">
          <label>Operating system</label>
          <MultipleSelect
            options={operatingSystems}
            name="operatingSystems"
            setForm={setForm}
            platform={form.platform}
          />
        </div>
        <div className="RequestForm__field">
          <label>Browser</label>
          <MultipleSelect
            options={browsers}
            name="browsers"
            setForm={setForm}
            platform={form.platform}
          />
        </div>
        <div className="RequestForm__field">
          <label>Limit</label>
          <Select
            options={limits}
            name="limit"
            value={form.limit.toString()}
            onChange={handleChange}
            required={true}
          />
        </div>
      </fieldset>
    </form>
  );
};
