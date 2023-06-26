import { Col, Row } from 'react-bootstrap';
import { OverviewBudget } from './cards/OverviewTotalEarn';
import { OverviewTotalProfit } from './cards/OverviewTotalProfit';
import { NumberOfProperties } from './cards/NumberOfProperties';
import { OverviewCountPaidUser } from './cards/OverviewCountPaidUser';
import { useEffect } from 'react';
import axios from 'axios';

function StatisticsBar() {

  useEffect (() => {
    const BACKEND_URL = 'http://localhost:4000';
      axios.get(`${BACKEND_URL}/backOffice/dashboard`).then((res) => {
        console.log(res.data);
      }).catch((err) => {
        console.error(err);
      });
  });

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
      <Col>
        <OverviewCountPaidUser 
              sx={{ height: '100%' }}
              value="24" />
      </Col>
    </Row>
    </>
  );
}

export default StatisticsBar;