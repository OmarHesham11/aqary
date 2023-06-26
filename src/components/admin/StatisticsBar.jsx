import { Col, Row } from 'react-bootstrap';
import { OverviewBudget } from './cards/OverviewTotalEarn';
import { OverviewTotalProfit } from './cards/OverviewTotalProfit';
import { NumberOfProperties } from './cards/NumberOfProperties';
import { OverviewCountPaidUser } from './cards/OverviewCountPaidUser';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Loading';

function StatisticsBar() {
  const [loading, setLoading] = useState(true);
  const [ {countPaidUser, totalProfits, thisMonthTotal, percentageDifference, countOfProperties} , setStatistics] = useState({countPaidUser: 0, totalProfits: 0, thisMonthTotal: 0, percentageDifference: 0, countOfProperties: 0});

  useEffect (() => {
    const BACKEND_URL = 'http://localhost:4000';
      axios.get(`${BACKEND_URL}/backOffice/dashboard/statistics`).then((res) => {
        console.log(res.data)
        setStatistics(res.data);
        setLoading(false);
      }).catch((err) => {
        console.error(err);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <>
    <Row className="mb-4">
      <Col>
        <OverviewTotalProfit 
              positive
              sx={{ height: '100%' }}
              value={`${totalProfits}$`} />
      </Col>
      <Col>
        <OverviewBudget 
              difference={percentageDifference}
              positive
              sx={{ height: '100%' }}
              value={`${thisMonthTotal}$`} />
      </Col>
    </Row>
    
    <Row className="mb-4">
      <Col>
        <NumberOfProperties 
              sx={{ height: '100%' }}
              value={`${countOfProperties}`} />
      </Col>
      <Col>
        <OverviewCountPaidUser 
              sx={{ height: '100%' }}
              value={countPaidUser} />
      </Col>
    </Row>
    </>
  );
}

export default StatisticsBar;