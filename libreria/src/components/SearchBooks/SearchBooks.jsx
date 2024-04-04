import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchBooks = ({ onSearch }) => {
    const handleSearch = (event) => {
        onSearch(event.target.value); // Pass the search term back to the parent component
    };

    return (
        <Form>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Buscar libros..."
                    onChange={handleSearch}
                />
            </Form.Group>
        </Form>
    );
};

export default SearchBooks;
