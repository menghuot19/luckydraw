import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import StudentPicker from './StudentPicker/StudentPicker.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentPicker/>
  </StrictMode>,
)
