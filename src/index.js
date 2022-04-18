import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

// Для измерения производительности приложения
// передать ф-ю для логирования результатов
// (например: reportWebVitals(console.log))
// или отправить для аналитики. Узнать больше: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
