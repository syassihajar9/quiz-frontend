import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function QuizPlayPage() {
  const { quizId } = useParams(); // on récupère l'id du quiz depuis l'URL
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/quizzes/${quizId}/questions`);
        setQuestions(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des questions :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  if (loading) {
    return <div>Chargement des questions...</div>;
  }

  if (questions.length === 0) {
    return <div>Aucune question disponible pour ce quiz.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Questions du Quiz</h1>
      {questions.map((question, index) => (
        <div key={question.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Question {index + 1} : {question.enonce}</h3>
          <ul>
            <li>A : {question.option1}</li>
            <li>B : {question.option2}</li>
            <li>C : {question.option3}</li>
            <li>D : {question.option4}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default QuizPlayPage;
