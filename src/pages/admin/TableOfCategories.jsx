import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Button } from "react-bootstrap";
import CreateCategoryModal from '../../components/admin/CreateCategoryModal';
import EditCategoryModal from '../../components/admin/EditCategoryModal';

const BACKEND_URL = 'https://aqary-eg.onrender.com/backOffice/categories';
// const BACKEND_URL = 'http://localhost:4000/backOffice/categories';

export default function TableOfCategories() {
  const [categories, setCategories] = useState([]);
  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [ newCategoryName, setNewCategoryName ] = useState('');

  useEffect(() => {
    axios.get(BACKEND_URL + '/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        setCategories(res.data);
      })
      .catch(error => {
        clg
        Swal.fire('Error', error.message, 'error');
      });
  }, []);

  const handleDeleteCategory = (categoryId) => {
    axios.delete(`${BACKEND_URL}/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(() => {
        setCategories(categories.filter(category => category._id !== categoryId));
        Swal.fire('Success', 'Category deleted successfully', 'success');
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  const handleCreateCategory = (categoryName) => {
    axios.post(BACKEND_URL + '/', { name: categoryName }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        setCategories([...categories, res.data]);
        setShowCreateCategoryModal(false);
        Swal.fire('Success', 'Category created successfully', 'success');
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  const handleUpdateCategory = (categoryId, categoryName) => {
    axios.patch(`${BACKEND_URL}/${categoryId}`, { name: categoryName }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
      .then(() => {
        setCategories(categories.map(category => {
          if (category._id === categoryId) {
            return { ...category, name: categoryName };
          } else {
            return category;
          }
        }));
        Swal.fire('Success', 'Category updated successfully', 'success');
      })
      .catch(error => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  return (
    <>
      <div>
        <Button variant="primary" setNewCategoryName={setNewCategoryName} onClick={() => setShowCreateCategoryModal(true)}>Create Category</Button>
      </div>
      <CreateCategoryModal open={showCreateCategoryModal} onClose={() => setShowCreateCategoryModal(false)} onCreate={handleCreateCategory} />
      <TableContainer component={Paper}>
        <Table className={{ minWidth: 650 }} aria-label="categories table">
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <Button variant="primary" onClick={() => setEditCategory(category)}>Edit</Button>
                  <Button variant="danger" onClick={() => handleDeleteCategory(category._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {editCategory && (
        <EditCategoryModal category={editCategory} open={true} onClose={() => setEditCategory(null)} onUpdate={handleUpdateCategory} />
      )}
    </>
  );
}