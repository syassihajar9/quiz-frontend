import React, { useEffect, useState } from "react";
import axios from "axios";

function QuestionCRUD() {
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [form, setForm] = useState({
    enonce: "",
    type: "",
    points: 0,
    explication: "",
    quiz: { id: "" },
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchQuestions();
    fetchQuizzes();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/questions");
      console.log(res.data); // Ajoutez ce log pour vérifier la réponse
      // Vérifier si la réponse est un tableau
      if (Array.isArray(res.data)) {
        setQuestions(res.data);
      } else {
        setQuestions([]); // Si la réponse n'est pas un tableau, initialisez avec un tableau vide
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des questions", error);
      setQuestions([]); // En cas d'erreur, initialisez avec un tableau vide
    }
  };

  const fetchQuizzes = async () => {
    const res = await axios.get("http://localhost:9090/api/quizzes");
    setQuizzes(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "quiz") {
      setForm({ ...form, quiz: { id: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:9090/api/questions/${editId}`, form);
    } else {
      await axios.post("http://localhost:9090/api/questions", form);
    }
    setForm({ enonce: "", type: "", points: 0, explication: "", quiz: { id: "" } });
    setEditId(null);
    fetchQuestions();
  };

  const handleEdit = (question) => {
    setForm({
      enonce: question.enonce,
      type: question.type,
      points: question.points,
      explication: question.explication,
      quiz: { id: question.quiz?.id || "" },
    });
    setEditId(question.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:9090/api/questions/${id}`);
    fetchQuestions();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{editId ? "Modifier" : "Ajouter"} une Question</h2>
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="mb-3">
          <label>Énoncé</label>
          <input type="text" className="form-control" name="enonce" value={form.enonce} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Type</label>
          <select
            className="form-control"
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">-- Sélectionner un type --</option>
            <option value="choix_multiple">Choix Multiple</option>
            <option value="unique">Unique</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Points</label>
          <input type="number" className="form-control" name="points" value={form.points} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Explication</label>
          <textarea className="form-control" name="explication" value={form.explication} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Quiz</label>
          <select className="form-control" name="quiz" value={form.quiz.id} onChange={handleChange} required>
            <option value="">-- Sélectionner un quiz --</option>
            {quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>{quiz.nom}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success">{editId ? "Modifier" : "Ajouter"}</button>
      </form>

      <h3>Liste des Questions</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Énoncé</th>
            <th>Type</th>
            <th>Points</th>
            <th>Quiz</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.enonce}</td>
              <td>{q.type}</td>
              <td>{q.points}</td>
              <td>{q.quiz?.nom || "-"}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(q)}>Modifier</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(q.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default QuestionCRUD;
