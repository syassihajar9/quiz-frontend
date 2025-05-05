import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Quiz() {
  const { id } = useParams(); // récupère l'id depuis l'URL
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/quizzes/${id}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement du quiz :', error);
      }
    };

    fetchQuiz();
  }, [id]);

  if (!quiz) {
    return <div>Chargement du quiz...</div>;
  }

  return (
    <div>
      <h1>{quiz.nom}</h1>
      <p>{quiz.description}</p>
      {/* ici tu pourras afficher les questions */}
    </div>
  );
}

export default Quiz;
