import React from 'react';
import Button from 'react-bootstrap/Button';

const DeleteButton = ({ id_book, onDeletionSuccess }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v5/book/delete/${id_book}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Call the onDeletionSuccess function passed as a prop
            onDeletionSuccess(id_book);
        } catch (error) {
            console.error('Error al eliminar el libro:', error);
        }
    };

    return (
        <Button variant="danger" onClick={handleDelete}>
            Eliminar
        </Button>
    );
};

export default DeleteButton;
