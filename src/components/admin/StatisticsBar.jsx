import { Col, Row } from 'react-bootstrap';
import { OverviewBudget } from './cards/OverviewTotalEarn';
import { OverviewTotalProfit } from './cards/OverviewTotalProfit';
import { NumberOfProperties } from './cards/NumberOfProperties';

function StatisticsBar() {
  return (
    <>
    <Row className="mb-4">
      <Col>
        <OverviewTotalProfit 
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k" />
      </Col>
      <Col>
        <OverviewBudget 
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k" />
      </Col>
    </Row>
    
    <Row className="mb-4">
      <Col>
        <NumberOfProperties 
              sx={{ height: '100%' }}
              value="24" />
      </Col>
    </Row>
    </>
  );
}

export default StatisticsBar;