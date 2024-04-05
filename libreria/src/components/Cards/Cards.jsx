import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import DeleteButton from '../DeleteButton/DeleteButton'; // Make sure this path is correct
import EditBookRow from "../EditBookRow/EditBookRow"; // Make sure this path is correct // Adjust the path according to your file structure
import CreateBookButton from '../CreateBookButton/CreateBookButton';
import SearchBooks from '../SearchBooks/SearchBooks';
import './Cards.css'; 

function Cards() {
    const [bookData, setBookData] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateBook = async (book) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v5/book/${book.id_book}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (response.ok) {
                console.log('Libro actualizado con éxito');
                setBookData(bookData.map(b => b.id_book === book.id_book ? book : b));
                setEditingBook(null); // Exit editing mode
            } else {
                console.error('Error al actualizar el libro:', await response.text());
            }
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
        }
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
    const handleBookCreated = () => {
        fetchData(); // Fetch the updated book list after a new book is created
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
            
            <CreateBookButton onBookCreated={handleBookCreated} />
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

export default Cards;
