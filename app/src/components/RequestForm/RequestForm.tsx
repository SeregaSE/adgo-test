import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { getBrowsers, getGroups, getOperatingSystems, getPlatforms } from '../../store/thunk';

import { Button } from '../Button/Button';
import { DateInput } from '../DateInput/DateInput';
import { MultipleSelect } from '../Select/MultipleSelect/MultipleSelect';
import { Select } from '../Select/Select';

import './RequestForm.css';

export const RequestForm: FC = () => {
  const dispatch = useDispatch();
  const platforms = useSelector((state: RootState) => state.platforms);
  const browsers = useSelector((state: RootState) => state.browsers);
  const operatingSystems = useSelector((state: RootState) => state.operatingSystems);
  const groups = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getOperatingSystems());
    dispatch(getBrowsers());
    dispatch(getGroups());
  }, [dispatch]);

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
          <MultipleSelect options={operatingSystems} />
        </div>
        <div className="RequestForm__field">
          <label>Browser</label>
          <MultipleSelect options={browsers} />
        </div>
      </fieldset>
    </form>
  );
};
