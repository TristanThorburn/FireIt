import AuthProvider from '../contexts/AuthContext';
import Login from './user/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from '../components/PrivateRoutes';
import ErrorPage from './ErrorPage';
import SummaryDash from './SummaryDash';
import BackendDash from './BackendDash';

function App() {
  return (
    <div className="App">
      <Router>

        <AuthProvider>

          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<ErrorPage />} />
            
            <Route element={<PrivateRoutes />}>
              <Route exact path='/' element={<SummaryDash />} />
              <Route path='/backend-dash' element={<BackendDash />} />
            </Route>
          
          </Routes>

        </AuthProvider>

      </Router>  

    </div>
  );
}

export default App;
