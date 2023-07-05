import Joi from 'joi';
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditCategoryModal({ category, open, onClose, onUpdate }) {
  const [categoryName, setCategoryName] = useState(category.name);
  const schema = Joi.object({
    categoryName: Joi.string().min(2).max(6).required(),
  });
  const handleUpdateCategory = () => {
    const { error } = schema.validate({ categoryName });
    if (error) {
      Swal.fire({
        title: "Error!",
        text: 'category name is invalid',
        type: "Error",
        timer: 3000
      });
    } else {
      onUpdate(category._id, categoryName);
      onClose();
    }
  };

  return (
    <Modal show={ open } onHide={ onClose }>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control size="lg" type="text" value={ categoryName } onChange={ (e) => setCategoryName(e.target.value) } />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={ onClose }>Cancel</Button>
        <Button variant="primary" onClick={ handleUpdateCategory }>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
}