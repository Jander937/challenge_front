import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DeleteButton from '../DeleteButton/DeleteButton'; // Make sure this path is correct
import EditBookRow from "../EditBookRow/EditBookRow"; // Make sure this path is correct
import SearchBooks from '../SearchBooks/SearchBooks'; // Make sure this path is correct
import './Cards.css'; // Adjust the path according to your file structure

function Prueba() {
    const [bookData, setBookData] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateBook = async (book) => {
        // ... existing logic for updating a book
    };

    const cancelEdit = () => {
        setEditingBook(null);
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v5/book/seach`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBookData(data);
        } catch (error) {
            console.error('Error al obtener los libros:', error);
        }
    };

    const onDeletionSuccess = (id_book) => {
        setBookData(bookData.filter(book => book.id_book !== id_book));
    };

    const handleSearch = (term) => {
        setSearchTerm(term.toLowerCase());
    };

    const filteredBooks = searchTerm
        ? bookData.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.isbn.toLowerCase().includes(searchTerm) ||
            book.publication_year.toString().toLowerCase().includes(searchTerm)
          )
        : bookData;

    return (
        <div id="lucho">
            <SearchBooks onSearch={handleSearch} />
            {filteredBooks.map((book) => {
                if (editingBook && book.id_book === editingBook.id_book) {
                    return (
                        <EditBookRow
                            key={book.id_book}
                            book={editingBook}
                            onSave={handleUpdateBook}
                            onCancel={cancelEdit}
                        />
                    );
                } else {
                    return (
                        <Card key={book.id_book} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={book.image} />
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>
                                    Año de publicación: {book.publication_year}
                                </Card.Text>
                                <Button variant="primary" onClick={() => setEditingBook(book)}>Editar</Button>
                                <DeleteButton id_book={book.id_book} onDeletionSuccess={onDeletionSuccess} />
                            </Card.Body>
                        </Card>
                    );
                }
            })}
        </div>
    );
}

export default Prueba;
