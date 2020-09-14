import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const apiUrl = `https://gorest.co.in/public-api/users?limit=4`;
const apiData = [];

fetch(apiUrl)
  .then((res) => res.json())
  .then((repos) => {
    for (var i = 0; i < repos.data.length; i++) {
      var obj = {
        id: repos.data[i].id,
        name: repos.data[i].name,
        email: repos.data[i].email,
        gender: repos.data[i].gender,
        status: repos.data[i].status,
        created_at: repos.data[i].created_at,
        updated_at: repos.data[i].updated_at,
      };
      apiData.push(obj);
    }
    ReactDOM.render(<App people={apiData} />, document.getElementById('root'));
  });
