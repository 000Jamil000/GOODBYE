import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Authorization from '../authorization/authorization';
import Registration from '../registration/Registration';
import Form from '../form/Form'; // Убедитесь, что путь к файлу Form указан правильно
import TicketList from '../ticket_output/TicketList';
import './TicketSearch.css'


const TicketSearch = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tickets, setTickets] = useState([]);

  // Функция для обновления билетов
  const updateTickets = (newTickets) => {
    setTickets(newTickets);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Authorization onLogin={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/registration"
          element={<Registration onRegister={() => setIsAuthenticated(true)} />}
        />
        <Route
          path="/form"
          element={
            isAuthenticated ? (
              <Form setTickets={updateTickets} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/tickets"
          element={
            isAuthenticated ? (
              <TicketList tickets={tickets} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default TicketSearch;
