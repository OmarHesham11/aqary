import Joi from 'joi';
import { useState } from 'react';
import { Button, Form, Modal } from "react-bootstrap";
import Swal from 'sweetalert2';

export default function CreateCategoryModal({ open, onClose, onCreate }) {
  const [categoryName, setCategoryName] = useState('');
  const schema = Joi.object({
    categoryName: Joi.string().min(2).max(6).required(),
  });
  const handleCreateCategory = () => {
    const { error } = schema.validate({ categoryName });
    if (error) {
      Swal.fire({
        title: "Error!",
        text: 'category name is invalid',
        type: "Error",
        timer: 2000,
        });
    } else {
      onCreate(categoryName);
      setCategoryName('');
    }
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