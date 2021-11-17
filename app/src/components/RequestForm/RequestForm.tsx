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

    dispatch(getStatistics(form));
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
          <DateInput name="from" required={true} value={form.from} onChange={handleChange} />
        </div>
        <div className="RequestForm__field">
          <label>To</label>
          <DateInput name="to" required={true} value={form.to} onChange={handleChange} />
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
        <Button>Применить</Button>
      </fieldset>
      <fieldset className="RequestForm__fieldset">
        <div className="RequestForm__field">
          <label>Platform</label>
          <MultipleSelect
            options={platforms}
            name="platforms"
            setForm={setForm}
            groupBy={form.groupBy}
          />
        </div>
        <div className="RequestForm__field">
          <label>Operating system</label>
          <MultipleSelect
            options={operatingSystems}
            name="operatingSystems"
            setForm={setForm}
            groupBy={form.groupBy}
            platforms={form.platforms}
          />
        </div>
        <div className="RequestForm__field">
          <label>Browser</label>
          <MultipleSelect
            options={browsers}
            name="browsers"
            setForm={setForm}
            groupBy={form.groupBy}
            platforms={form.platforms}
          />
        </div>
      </fieldset>
    </form>
  );
};
