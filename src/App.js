import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import QuizManagement from './component/QuizManagement';
import Quiz from './component/Quiz'; // Import my component
import QuizApp from './component/QuizApp'; // Import my component
import CategoryApp from './component/CategoryApp'; // Import my component
import QuestionCRUD from './component/QuestionCRUD';
import QuizTestPage from './component/QuizTestPage';
import Accueil from './component/Accueil.js';
import QuizPlayPage from './component/QuizPlayPage'; // Import my component


 // Import my component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-quiz" element={<QuizApp />} />
        <Route path="/categories" element={<CategoryApp />} />
        <Route path="/play/:quizId" element={<QuizPlayPage />} />

        <Route path="/Accueil" element={<Accueil />} />

        <Route path="/questions" element={<QuestionCRUD />} />
        <Route path="/test" element={<QuizTestPage />} />
        <Route path="/quiz/:id" element={<Quiz />} />

        <Route path="/quiz-management" element={<QuizManagement />} /> // New route
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;