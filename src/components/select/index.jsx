import { Button, Col, Row, Select, Grid } from 'antd';
import { Tagging } from '../../constants/taging';
import { useEffect, useState } from 'react';
const { useBreakpoint } = Grid;
const options = [];
Object.keys(Tagging).map((x) => {
  options.push({
    value: x,
    label: x,
  });
});

const SelectTag = ({ filterListFunc }) => {
  const screens = useBreakpoint();
  const [isSmallSceen, setIsSmallScreen] = useState(false);
  const [selectedTag, setSelectedTag] = useState([]);
  useEffect(() => {
    let currentScreenData = Object.entries(screens);
    setIsSmallScreen(true);
    if (currentScreenData.length > 0) {
      currentScreenData.map(([key, value]) => {
        if (key === 'xl' || key === 'lg' || key === 'xxl') {
          value && setIsSmallScreen(false);
        }
      });
    }
  }, [Object.assign(screens, {})]);
  const checkMarginTop = () => (isSmallSceen ? '1rem' : '0px');

  return (
    <Row style={{ marginTop: '1rem' }}>
      <Col xs={{ span: 24, offset: 1 }} lg={{ span: 20 }}>
        <Select
          mode="tags"
          style={{
            width: '100%',
          }}
          placeholder="Please Select Tag to be filter"
          onChange={setSelectedTag}
          options={options}
          allowClear
        />
      </Col>
      <Col
        xs={{ span: 24, offset: 1 }}
        lg={{ span: 2 }}
        style={{ marginTop: checkMarginTop() }}
      >
        <Button
          style={{ width: '100%' }}
          onClick={() => filterListFunc(selectedTag)}
        >
          Search
        </Button>
      </Col>
    </Row>
  );
};
export default SelectTag;
