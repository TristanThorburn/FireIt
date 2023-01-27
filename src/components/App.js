import AuthProvider from '../contexts/AuthContext';
import KeyPad from './user/KeyPad';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from '../components/PrivateRoutes';
import ErrorPage from './ErrorPage';
import SummaryDash from './SummaryDash';

function App() {
  return (
    <div className="App">
      <Router>

        <AuthProvider>

          <Routes>
            <Route path='/login' element={<KeyPad />} />
            <Route path='*' element={<ErrorPage />} />
            
            <Route element={<PrivateRoutes />}>
              <Route exact path='/' element={<SummaryDash />} />
            </Route>
          
          </Routes>

        </AuthProvider>

      </Router>  

    </div>
  );
}

export default App;
