import AuthProvider from '../contexts/AuthContext';
import TableProvider from '../contexts/TableContext';
import Login from './user/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoutes from '../components/PrivateRoutes';
import ErrorPage from './ErrorPage';
import FrontDash from './FrontDash';
import BackendDash from './BackendDash';
import MenuData from './backdash/MenuData';
import EmployeeData from './backdash/EmployeeData';
import TableMapData from './backdash/TableMapData';
import PaymentData from './backdash/PaymentData';
import SettingsData from './backdash/SettingsData';

function App() {
  return (
    <div className='App'>
      <Router>

        <AuthProvider>
        <TableProvider>

          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<ErrorPage />} />
            
            <Route element={<PrivateRoutes />}>
                <Route exact path='/' element={<FrontDash />} />
            </Route>

            <Route path='/backend-dash' element={<BackendDash />} />
            <Route path='/menu-data' element={<MenuData />} />
            <Route path='/employee-data' element={<EmployeeData />} />
            <Route path='/tablemap-data' element={<TableMapData />} />
            <Route path='/payment-data' element={<PaymentData />} />
            <Route path='/settings' element={<SettingsData />} />
          
          </Routes>
        
        </TableProvider>
        </AuthProvider>

      </Router>  

    </div>
  );
}

export default App;
