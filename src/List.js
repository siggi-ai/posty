import { useState, useEffect } from 'react';
import './List.css';
import ListItem from './ListItem';
import Form from './Form';

  function List() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/contacts')
        .then((response) => response.json())
        .then((data) => setContacts(data));
    }, []);

    async function handleDelete(contact) {
      const url = `http://localhost:3000/contacts/${contact.id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        setContacts((prevState) =>
          prevState.filter((prevContact) => prevContact.id !== contact.id),
        );
      }
    }
    
    async function handleSave(contact) {
      const response = await fetch(`http://localhost:3000/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
      });
      if (response.status === 201) {
        const id = response.headers.get('Location').split('/').pop();
        setContacts((prevContacts) => [...prevContacts, {...contact, id}]);
      }
    }

    return (
      <>
      <table className='contactTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <ListItem 
              key={contact.id} 
              contact={contact} 
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      <Form onSave={handleSave} />
      </>
    );
  }
  
  export default List;