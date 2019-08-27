/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import './App.scss';
import logo from './images/github.svg';
import star from './images/star.svg';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(async () => {
    const response = await fetch(
      'https://api.github.com/users/coderamos/repos'
    );
    const data = await response.json();
    setRepositories(data);
  }, []);

  useEffect(() => {
    const favorites = repositories.filter(repository => {
      return repository.favorite;
    });
    document.title = `githooks counter: ${favorites.length}`;
  }, [repositories]);

  function handleFavorite(repositoryID) {
    const newRepositories = repositories.map(repository => {
      return repository.id === repositoryID
        ? { ...repository, favorite: !repository.favorite }
        : repository;
    });
    setRepositories(newRepositories);
  }

  return (
    <div className="main-container">
      <div className="title">
        <img className="logo" src={logo} alt="github logo" />
        <h1>GITHOOKS</h1>
        <small>
          made with{' '}
          <a href="https://pt-br.reactjs.org/docs/hooks-intro.html">
            React Hooks
          </a>
        </small>
      </div>

      <ul className="repositories-container">
        {repositories.map(repository => (
          <li className="repository-item" key={repository.id}>
            {repository.favorite && (
              <span>
                <img src={star} alt="star" />
              </span>
            )}
            {repository.name}
            <button
              className="favorite-button"
              onClick={() => handleFavorite(repository.id)}>
              <img src={star} alt="star" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
