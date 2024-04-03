import React, { useState, useEffect } from "react";

const Cards = () => {
    const [bookData, setBookData] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const [newBook, setNewBook] = useState({
        title: "",
        isbn: "",
        publication_year: ""
    });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/v5/book/seach');
            const data = await response.json();
            setBookData(data);
            console.log(data)
        } catch (error) {
            console.error('Error al obtener los libros:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateBook = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/v5/book/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                console.log('Libro creado con éxito');
                fetchData(); // Recarga los datos para reflejar los cambios
                setNewBook({
                    title: "",
                    isbn: "",
                    publication_year: ""
                }); // Limpia los campos del formulario
            } else {
                console.error('Error al crear el libro:', await response.text());
            }
        } catch (error) {
            console.error('Error al crear el libro:', error);
        }
    };

    const handleEdit = (bookId) => {
        const bookToEdit = bookData.find(book => book.id_book === bookId);
        setEditingBook(bookToEdit);
    };

    const handleUpdateBook = async (event) => {
        event.preventDefault();
        console.log('Enviando datos al servidor:', editingBook);

        try {
            const response = await fetch(`http://localhost:8080/api/v5/book/${editingBook.id_book}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingBook),
            });

            if (response.ok) {
                console.log('Libro actualizado con éxito');
                fetchData(); // Recarga los datos para reflejar los cambios
                setEditingBook(null); // Cierra el formulario de edición
            } else {
                console.error('Error al actualizar el libro:', await response.text());
            }
        } catch (error) {
            console.error('Error al actualizar el libro:', error);
        }
    };

    const handleDelete = async (id_book) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este libro?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/v5/book/delete/${id_book}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    setBookData(bookData.filter(book => book.id_book !== id_book));
                } else {
                    console.error('Error al eliminar el libro:', await response.text());
                }
            } catch (error) {
                console.error('Error al eliminar el libro:', error);
            }
        }
    };

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v5/book/title?title=${searchTerm}`);
            const data = await response.json();
            setBookData(data);
        } catch (error) {
            console.error('Error al buscar libros:', error);
        }
    };

    return (
        <div>
            {/* Formulario para crear un nuevo libro */}
            <form onSubmit={handleCreateBook}>
                <input
                    type="text"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                    placeholder="Título"
                    required
                />
                <input
                    type="text"
                    name="isbn"
                    value={newBook.isbn}
                    onChange={handleInputChange}
                    placeholder="ISBN"
                    required
                />
                <input
                    type="text"
                    name="publication_year"
                    value={newBook.publication_year}
                    onChange={handleInputChange}
                    placeholder="Año de publicación"
                    required
                />
                <button type="submit">Crear libro</button>
            </form>

            {/* Barra de búsqueda */}
            <input
                type="text"
                placeholder="Buscar por título"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handleSearch(); // Llama a la función de búsqueda cada vez que cambia el término de búsqueda
                }}
            />

            {/* Tabla de libros existentes */}
            <table>
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Título</th>
                        <th>Año de publicación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {bookData.map((book) => (
                        <tr key={book.id_book}>
                            <td>{book.isbn}</td>
                            <td>{book.title}</td>
                            <td>{book.publication_year}</td>
                            <td>
                    {/* Aquí estableces la URL de la imagen como el src del elemento img */}
                    <img src={book.image} alt="Imagen del libro" />
                </td>
                          
                            <td>
                                <button onClick={() => handleEdit(book.id_book)}>Editar</button>
                                <button onClick={() => handleDelete(book.id_book)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Cards;
