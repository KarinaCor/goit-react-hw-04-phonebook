import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import * as SC from './App.styled'

const contactsData = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const stringifiedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(stringifiedContacts) ?? contactsData;
    return parsedContacts;
  });
  const [filter, setFilter] = useState('');

useEffect(() => {
  const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', stringifiedContacts);
  }, [contacts]);


const handleAddContact = data => {
  const isAvailable = contacts.some(contact => contact.name.toLowerCase() === data.name.toLowerCase());
  if (isAvailable) {
    alert('$(data.name) is already in contacts.')
    return
}

const finalContact = {
  ...data,
  id:nanoid()

}
setContacts(prevState => [...prevState, finalContact]);
}
 

const getContacts = () => {
 
const lowerWords = filter.toLowerCase()
return contacts.filter(({name}) => name.toLowerCase().includes(lowerWords)
)}

const filterContacts = evt => {
  setFilter(evt.currentTarget.value);
};

 const handleDeleteContact = contactId => {
  setContacts(prevState => prevState.filter(({ id }) => id !== contactId));
}


 
  return (
    <SC.Wrapper>
      <SC.MainTitle>Phonebook</SC.MainTitle>
      <ContactForm handleAddContact={handleAddContact} />

      <SC.Title>Contacts</SC.Title>

      {contacts.length !== 0 ? (
        <>
          <Filter value={filter} filterContacts={filterContacts} />
          <ContactList
            contacts={getContacts()}
            handleDelete={handleDeleteContact}
          />
        </>
      ) : (
        <SC.Descr>Phonebook is empty</SC.Descr>
      )}
    </SC.Wrapper>
  );
};

