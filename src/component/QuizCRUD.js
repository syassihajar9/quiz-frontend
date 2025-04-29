import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuizCRUD() {
  const [quiz, setQuiz] = useState({ nom: "", description: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9090/api/quizzes", quiz);
      const createdQuiz = res.data;
      navigate("/questions", { state: { quizId: createdQuiz.id } });
    } catch (err) {
      console.error("Erreur création quiz", err);
    }
  };

  return (
    <div className="quiz-form">
      <h2>Créer un nouveau Quiz</h2>
      <form onSubmit={handleSubmit}>
        <label>Nom :</label>
        <input name="nom" value={quiz.nom} onChange={handleChange} required />

        <label>Description :</label>
        <textarea name="description" value={quiz.description} onChange={handleChange} />

        <button type="submit">Créer et Ajouter des Questions</button>
      </form>
    </div>
  );
}

export default QuizCRUD;
