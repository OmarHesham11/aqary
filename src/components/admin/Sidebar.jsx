import { useState } from 'react';
import { Nav, Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white" style={{ height: '100vh' }}>
      <Nav className="nav-pills flex-column mb-auto">
        <Nav.Item>
          <Nav.Link href="#" className="nav-link active">
            Dashboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="nav-link">
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="nav-link">
            Products
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="#" className="nav-link">
            Customers
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="mt-auto">
        <button
          className="btn btn-primary btn-sm d-flex justify-content-center align-items-center"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <i className="bi bi-chevron-left"></i>
          ) : (
            <i className="bi bi-chevron-right"></i>
          )}
        </button>
      </div>
      <Collapse in={open}>
        <div className="mt-3">
          <h1>Hello world!</h1>
        </div>
      </Collapse>
    </div>
  );
}

export default Sidebar;