import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Prueba.css';

function Prueba() {
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v5/book/seach');
            const data = await response.json();
            setBookData(data);
            console.log(data);
        } catch (error) {
            console.error('Error al obtener los libros:', error);
        }
    };

    return (
        <div id="lucho">
            {bookData.map((book) => (
                <Card key={book.id_book} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={book.image} />
                    <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>
                            Año de publicación: {book.publication_year}
                        </Card.Text>
                        <Button variant="primary">Ver detalles</Button>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default Prueba;
