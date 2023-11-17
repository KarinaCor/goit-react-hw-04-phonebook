import { useState } from 'react';
import * as SC from './ContactForm.styled';

export const ContactForm = ({ handleAddContact, handleSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  handleSubmit = event => {
    event.preventDefault();

    handleAddContact({ name, number });
    setName('');
    setNumber('');
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    switch (name) {
      case 'name': {
        setName(value);
        return;
      }
      case 'number': {
        setNumber(value);
        return;
      }
      default:
        return;
    }
  };

  return (
    <SC.Form onSubmit={handleSubmit}>
      <SC.Label>
        Name
        <SC.Input
          onChange={handleChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          required
        />
      </SC.Label>
      <SC.Label>
        Number
        <SC.Input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
          required
        />
      </SC.Label>
      <SC.Button type="submit">Add contact</SC.Button>
    </SC.Form>
  );
};
