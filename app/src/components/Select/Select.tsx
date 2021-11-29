/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Select, Typography } from 'antd';

const { Option } = Select;
const { Title } = Typography;

interface TOwnProps {
  options: Array<any>;
  titleSelect?: string;
  disabled?: boolean;
  onChange?: any;
  defaultValue?: string | Array<string>;
  allowClear?: boolean;
  mode?: 'multiple' | 'tags' | undefined;
}

const SelectCustom: React.FC<TOwnProps> = ({
  options = [],
  titleSelect = '',
  onChange = () => null,
  disabled = false,
  defaultValue,
  allowClear = false,
  mode,
}) => {
  const isOptioned = options.length > 0;

  if (!isOptioned) {
    return null;
  }

  return (
    <>
      <Title level={5}>{titleSelect}</Title>

      <Select
        style={{ width: '90%' }}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        allowClear={allowClear}
        mode={mode}
      >
        {options?.map(({ label, value }) => (
          <Option value={value} key={value}>
            {label}
          </Option>
        ))}
      </Select>
    </>
  );
};

export default SelectCustom;
