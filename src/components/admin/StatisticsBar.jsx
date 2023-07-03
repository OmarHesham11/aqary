import { Col, Row } from 'react-bootstrap';
import { OverviewBudget } from './cards/OverviewTotalEarn';
import { OverviewTotalProfit } from './cards/OverviewTotalProfit';
import { NumberOfProperties } from './cards/NumberOfProperties';
import { OverviewCountPaidUser } from './cards/OverviewCountPaidUser';
import { useMemo, useState, memo } from 'react';
import axios from 'axios';
import Loading from '../Loading';

function StatisticsBar() {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState(null);

  const fetchStatistics = async () => {
    const BACKEND_URL = 'https://aqary-eg.onrender.com';
    const res = await axios.get(`${BACKEND_URL}/backOffice/dashboard/statistics`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(res.data)
    return res.data;
  };

  useMemo(async () => {
    const data = await fetchStatistics();
    setStatistics(data);
    setLoading(false);
  }, []);

  if (loading) return <Loading />;

  return (
    <>
    <Row className="mb-4">
      <Col>
        <OverviewTotalProfit 
              positive
              sx={{ height: '100%' }}
              value={`${statistics.totalProfits}$`} />
      </Col>
      <Col>
        <OverviewBudget 
              difference={statistics.percentageDifference}
              positive
              sx={{ height: '100%' }}
              value={`${statistics.thisMonthTotal}$`} />
      </Col>
    </Row>
    
    <Row className="mb-4">
      <Col>
        <NumberOfProperties 
              sx={{ height: '100%' }}
              value={`${statistics.countOfProperties}`} />
      </Col>
      <Col>
        <OverviewCountPaidUser 
              sx={{ height: '100%' }}
              value={statistics.countPaidUser} />
      </Col>
    </Row>
    </>
  );
}

export default memo(StatisticsBar);