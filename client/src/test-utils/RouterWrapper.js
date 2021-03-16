import React from 'react';
import { MemoryRouter } from 'react-router-dom';

const RouterWrapper = ({ ui, ...props }) => {
  return (
    <MemoryRouter initialEntries={[props.initialRoute]}>{ui}</MemoryRouter>
  );
};

export default RouterWrapper;
