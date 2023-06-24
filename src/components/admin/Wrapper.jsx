import { Container, Row, Col } from 'react-bootstrap';
import SideNav from './navs/SideNav';

function Wrapper({ children }) {
  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="p-0">
          <SideNav />
        </Col>
        <Col className='p-5' xs={10}>
          {children}
        </Col>
      </Row>
    </Container>
  );
}

export default Wrapper;