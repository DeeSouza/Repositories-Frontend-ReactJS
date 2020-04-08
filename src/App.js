import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    loadRepositories();
  }, [])

  async function loadRepositories(){
    const response = await api.get('repositories');
    setRepositories(response.data);
  }

  async function handleAddRepository() {
    const data = {
      title: "Desafio ReactJS",
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-reactjs",
      techs: ["React Native", "NodeJS", "PHP"]
    }

    const response = await api.post('repositories', data);
    const repository = response.data;

    setRepositories([
      ...repositories, 
      repository
    ]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(repo => repo.id === id);
    
    repositories.splice(repositoryIndex, 1);
    setRepositories([ ...repositories ]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
