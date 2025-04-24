import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons for actions
import './QuizApp.css'; // Ensure that your CSS file contains necessary styles

const API_URL = 'http://localhost:9090/api';

const QuizApp = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ id: null, nom: '', description: '', difficulte: '', categorieId: '' });

  useEffect(() => {
    fetchQuizzes();
    fetchCategories();
  }, []);

  const fetchQuizzes = async () => {
    const res = await axios.get(`${API_URL}/quizzes`);
    setQuizzes(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get(`${API_URL}/categories`);
    setCategories(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      nom: form.nom,
      description: form.description,
      difficulte: form.difficulte,
      categorie: { id: form.categorieId }
    };

    if (form.id) {
      await axios.put(`${API_URL}/quizzes/${form.id}`, quizData);
    } else {
      await axios.post(`${API_URL}/quizzes`, quizData);
    }

    setForm({ id: null, nom: '', description: '', difficulte: '', categorieId: '' });
    fetchQuizzes();
  };

  const handleEdit = (quiz) => {
    setForm({
      id: quiz.id,
      nom: quiz.nom,
      description: quiz.description,
      difficulte: quiz.difficulte,
      categorieId: quiz.categorie.id
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Confirmer la suppression ?')) {
      await axios.delete(`${API_URL}/quizzes/${id}`);
      fetchQuizzes();
    }
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="app-title">Quiz App</div>
        <nav className="nav-menu">
          {['Dashboard', 'Quiz', 'Questions', 'Users', 'Categorie', 'Settings'].map((item) => (
            <div key={item} className={`nav-item ${item === 'Quiz' ? 'active' : ''}`}>
              <div className="nav-icon"></div>
              <span>{item}</span>
            </div>
          ))}
        </nav>
      </div>

      <div className="main-content">
        <header className="header">
          <h1 className="page-title">Gestion des Quiz</h1>
          <div className="user-controls">
            <button className="logout-btn">Logout</button>
            <div className="user-info">
              <span>Anasse Lekkioui</span>
              <div className="user-avatar-container">
                <div className="user-avatar"></div>
                <span className="dropdown-icon">▼</span>
              </div>
            </div>
          </div>
        </header>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="form-grid">
            <div className="form-group">
              <label>Nom du Quiz</label>
              <input
                type="text"
                name="nom"
                placeholder="Nom du quiz"
                value={form.nom}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Difficulté</label>
              <select
                name="difficulte"
                value={form.difficulte}
                onChange={handleChange}
                required
              >
                <option value="">-- Choisir la difficulté --</option>
                <option value="FACILE">FACILE</option>
                <option value="MOYENNE">MOYENNE</option>
                <option value="DIFFICILE">DIFFICILE</option>
              </select>
            </div>
            <div className="form-group">
              <label>Catégorie</label>
              <select
                name="categorieId"
                value={form.categorieId}
                onChange={handleChange}
                required
              >
                <option value="">-- Choisir une catégorie --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nom}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="generate-btn">
              {form.id ? 'Modifier' : 'Ajouter'}
            </button>
          </form>
        </div>

        <div className="quiz-table-container">
          <table className="quiz-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Difficulté</th>
                <th>Catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td>{quiz.id}</td>
                    <td>{quiz.nom}</td>
                    <td>{quiz.description}</td>
                    <td>{quiz.difficulte}</td>
                    <td>{quiz.categorie?.nom}</td>
                    <td>
                      <button className="action-btn edit" onClick={() => handleEdit(quiz)}>
                        <FaEdit />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(quiz.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>
                    Aucun quiz trouvé
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizApp;
