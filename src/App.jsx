import { useState } from 'react';
import Form from './Form';
import { ToastContainer, toast } from 'react-toastify';
import Items from './Items';
import { nanoid } from 'nanoid';

const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
        list = JSON.parse(localStorage.getItem('list'));
    } else {
        list = [];
    }
    return list;
};

const setLocalStorage = (items) => {
    localStorage.setItem('list', JSON.stringify(items));
};

const defaultList = JSON.parse(localStorage.getItem('list') || '[]');

const App = () => {
    const [items, setItems] = useState(defaultList);

    const addItem = (itemName) => {
        const newItem = {
            id: nanoid(),
            name: itemName,
            completed: false
        };
        const newItems = [...items, newItem];
        setItems(newItems);
        setLocalStorage(newItems);
        toast.success('Item added to the list');
    };

    const removeItem = (id) => {
        const newItems = items.filter((item) => item.id !== id);
        setItems(newItems);
        setLocalStorage(newItems);
        toast.success('Item removed');
    };

    const editItem = (id) => {
        const newItems = items.map((item) => {
            if (item.id === id) {
                const newItem = { ...item, completed: !item.completed };
                return newItem;
            }
            return item;
        });
        setItems(newItems);
        setLocalStorage(newItems);
    };

    return (
        <section className="section-center">
            <Form addItem={addItem} />
            <Items items={items} removeItem={removeItem} editItem={editItem} />
            <ToastContainer position="top-center" />
        </section>
    );
};

export default App;
