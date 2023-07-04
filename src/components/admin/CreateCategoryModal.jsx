import { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";

export default function CreateCategoryModal({ open, onClose, onCreate }) {
  const [categoryName, setCategoryName] = useState('');

  const handleCreateCategory = () => {
    console.log(categoryName);
    onCreate(categoryName);
    setCategoryName('');
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Property</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control size="lg" value={categoryName} type="text" onChange={(e) => setCategoryName(e.target.value)} placeholder="Category name" />
        <Button variant="primary" onClick={handleCreateCategory} style={{ marginTop: '25px', float: 'right' }}>
          Create
        </Button>
      </Modal.Body>
    </Modal>
  );
}