import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditCategoryModal({ category, open, onClose, onUpdate }) {
  const [categoryName, setCategoryName] = useState(category.name);

  const handleUpdateCategory = () => {
    onUpdate(category._id, categoryName);
    onClose();
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control size="lg" type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant="primary" onClick={handleUpdateCategory}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}