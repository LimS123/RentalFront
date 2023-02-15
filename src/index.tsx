import React from 'react';
import Routes from './components/routes/routes';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ReactDOM from 'react-dom/client';
import './index.css'
import { LocalizationProvider } from '@mui/x-date-pickers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Routes />
    </LocalizationProvider>
  </React.StrictMode>
);


