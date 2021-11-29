/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Table } from 'antd';
const { Column } = Table;

interface TOwnProps {
  dataSource: Array<any>;
}

const TableResults: React.FC<TOwnProps> = ({ dataSource = [] }) => {
  const isNotEmpty = dataSource.length > 0;

  if (!isNotEmpty) {
    return null;
  }

  return (
    <Table dataSource={dataSource} style={{ width: '100%' }}>
      <Column title="Day" dataIndex="day" key="day" />
      <Column title="Impressions" dataIndex="impressions" key="impressions" />
      <Column title="Convertions" dataIndex="convertions" key="convertions" />
      <Column title="Money" dataIndex="money" key="money" />
    </Table>
  );
};

export default TableResults;
