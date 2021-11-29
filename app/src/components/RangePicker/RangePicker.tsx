/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

interface TOwnProps {
  onCalendarChange?: any;
}

const RangePickerCustom: React.FC<TOwnProps> = ({
  onCalendarChange = () => null,
}) => (
  <RangePicker onCalendarChange={onCalendarChange} style={{ width: '90%' }} />
);

export default RangePickerCustom;
