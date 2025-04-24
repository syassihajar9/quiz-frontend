import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';
import QuizManagement from './component/QuizManagement';
import EditQuiz from './component/EditQuiz'; // Import my component
import QuizApp from './component/QuizApp'; // Import my component
import CategoryApp from './component/CategoryApp'; // Import my component

 // Import my component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-quiz" element={<QuizApp />} />
        <Route path="/categories" element={<CategoryApp />} />

        <Route path="/edit-quiz/:id" element={<EditQuiz />} />
        <Route path="/quiz-management" element={<QuizManagement />} /> // New route
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;