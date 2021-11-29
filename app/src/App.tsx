/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useEffect, useState, useMemo } from 'react';
import { observer } from 'mobx-react';

import { Col, Row, Typography, Divider, Layout } from 'antd';

import SelectCustom from './components/Select';
import RangePickerCustom from './components/RangePicker';

import TableResults from './blocks/TableResults';
import useControllers from './stores';

const { Title } = Typography;
const { Content } = Layout;

const App = function () {
  const { getFilters, statistics } = useControllers();
  const {
    fetchFiltersPlatform,
    fetchFiltersBrowsers,
    fetchFiltersOperatingSystems,
    fetchFiltersGroups,

    filtersPlatform,
    filtersBrowsers,
    filtersOperatingSystems,
    filtersGroups,
  } = getFilters;

  const { fetchStatistics, statisticsArr } = statistics;

  useEffect(() => {
    fetchFiltersGroups();

    fetchFiltersPlatform();

    fetchFiltersBrowsers();

    fetchFiltersOperatingSystems();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const [groupBy, setGroupBy] = useState('day');
  const [platform, setPlatform] = useState('');

  const [browsers, setBroswers] = useState([]);
  const [operatingSystems, setOperatingSystems] = useState([]);

  useEffect(() => {
    fetchStatistics({
      groupBy,
      from,
      to,
      platform,
      browsers,
      operatingSystems,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, groupBy, platform, browsers, operatingSystems]);

  const handleChangeRangePicker = (date, dateString) => {
    setFrom(dateString[0]);
    setTo(dateString[1]);
  };

  const handleChangeGroupBy = (value) => {
    setGroupBy(value);
  };

  const handlePlatform = (value) => {
    setPlatform(value);
  };

  const handleChangeBrowsers = (values) => {
    setBroswers(values);
  };

  const handleOperatingSystems = (values) => {
    setOperatingSystems(values);
  };

  const disabledSelect = useMemo(() => !(!!from || !!to), [from, to]);

  return (
    <Layout>
      <Content style={{ padding: '50px' }}>
        <Row>
          <Col span={5}>
            <Title level={5}>From/To</Title>

            <RangePickerCustom onCalendarChange={handleChangeRangePicker} />
          </Col>

          <Col span={5}>
            <SelectCustom
              titleSelect="Group By"
              options={filtersGroups}
              onChange={handleChangeGroupBy}
              defaultValue="day"
              disabled={disabledSelect}
            />
          </Col>
        </Row>
        <Divider />

        <Row>
          <Col span={5}>
            <SelectCustom
              titleSelect="Platform"
              options={filtersPlatform}
              onChange={handlePlatform}
              allowClear
              disabled={disabledSelect}
            />
          </Col>

          <Col span={5}>
            <SelectCustom
              titleSelect="Operation System"
              options={filtersBrowsers}
              onChange={handleChangeBrowsers}
              allowClear
              disabled={disabledSelect}
              mode="multiple"
            />
          </Col>

          <Col span={5}>
            <SelectCustom
              titleSelect="Browsers"
              options={filtersOperatingSystems}
              mode="multiple"
              onChange={handleOperatingSystems}
              allowClear
              disabled={disabledSelect}
            />
          </Col>
        </Row>
        <Divider />

        <Row>
          <Col span={15}>
            <TableResults dataSource={statisticsArr} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default observer(App);
