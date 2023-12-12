import React, { useState } from 'react';
import './TicketSearch.css';
import TicketList from './TicketList'; // Путь к вашему компоненту TicketList
import { Form } from '../form/Form';

const TicketSearch = () => {
  const [tickets, setTickets] = useState([])
  const [selectedTab, setSelectedTab] = useState('form')

  return (
    <div>
      {selectedTab === 'form' && (
        <Form
            setTickets={setTickets}
            switchToTicketsTab={() => setSelectedTab('tickets')}
        />
      )}
      {selectedTab === 'tickets' && (
        <TicketList
            tickets={tickets}
            switchToForm={() => setSelectedTab('form')}
        />  
      )}
    </div>
  );
};

export default TicketSearch;
