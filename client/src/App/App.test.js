import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from '../configStore';

afterEach(cleanup);

test('Renders App component without error', () => {});
