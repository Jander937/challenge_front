import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const CreateBookButton = ({ onBookCreated }) => {
    const [show, setShow] = useState(false);
    const [newBook, setNewBook] = useState({
        title: '',
        isbn: '',
        publication_year: '',
        image: ''
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v5/book/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                onBookCreated();
                handleClose();
                setNewBook({
                    title: '',
                    isbn: '',
                    publication_year: '',
                    image: ''
                });
            } else {
                console.error('Error al crear el libro:', await response.text());
            }
        } catch (error) {
            console.error('Error al crear el libro:', error);
        }
    };

    return (
        <>
            <Button id="crear" variant="primary" onClick={handleShow}>
                Añadir Nuevo Libro
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Nuevo Libro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                required
                                value={newBook.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ISBN</Form.Label>
                            <Form.Control
                                type="text"
                                name="isbn"
                                required
                                value={newBook.isbn}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Año de Publicación</Form.Label>
                            <Form.Control
                                type="text"
                                name="publication_year"
                                required
                                value={newBook.publication_year}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Imagen (URL)</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={newBook.image}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Crear
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CreateBookButton;
