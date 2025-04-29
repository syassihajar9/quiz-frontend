import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import QuizManagement from './component/QuizManagement';
import QuizApp from './component/QuizApp'; // Import my component
import CategoryApp from './component/CategoryApp'; // Import my component
import QuestionCRUD from './component/QuestionCRUD';
import CreateQuestion from './component/CreateQuestion';
import Accueil from './component/Accueil.js';
import QuizDetails from './component/QuizDetails.js'; // Import my component


 // Import my component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-quiz" element={<QuizApp />} />
        <Route path="/categories" element={<CategoryApp />} />

        <Route path="/Accueil" element={<Accueil />} />

        <Route path="/questions" element={<QuestionCRUD />} />
        <Route path="/que" element={<CreateQuestion />} />
        <Route path="/quiz/:id" component={QuizDetails} />

        <Route path="/quiz-management" element={<QuizManagement />} /> // New route
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;