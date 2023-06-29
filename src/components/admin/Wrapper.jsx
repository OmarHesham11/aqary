import { Container, Row, Col } from 'react-bootstrap';
import { useCallback } from 'react';
import SideNav from './navs/SideNav';

function Wrapper({ children }) {
  const renderSideNav = useCallback(() => {
    return <SideNav />;
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="p-0">
          {renderSideNav()}
        </Col>
        <Col className='p-5' xs={10}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default Wrapper;