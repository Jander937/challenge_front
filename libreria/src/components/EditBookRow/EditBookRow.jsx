import React, { useState } from 'react';

const EditBookRow = ({ book, onSave, onCancel }) => {
    const [editBook, setEditBook] = useState({ ...book });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditBook((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        onSave(editBook);
    };

    return (
        <tr id='jander'>
            <td>
                <input
                    type="text"
                    name="image"
                    value={editBook.image}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="title"
                    value={editBook.title}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    name="publication_year"
                    value={editBook.publication_year}
                    onChange={handleInputChange}
                />
            </td>
            <td>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={onCancel}>Cancelar</button>
            </td>
        </tr>
    );
};

export default EditBookRow;
