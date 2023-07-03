/* eslint-disable no-extra-semi */
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/home/Home';
import LoginPage, {action as loginAction} from './pages/authentication/LoginPage';
import {action as logoutAction } from './pages/authentication/Logout';
import { checkAuthLoader, tokenLoader } from './util/auth';
import RegisterPage, {action as registerAction} from './pages/authentication/RegisterPage';
import PropertiesPage from './pages/property/propertiesPage';
import PropertyDetails from './pages/property/propertyDetailsPage';
import Admin from './pages/Admin';
import Dashboard from './pages/admin/Dashboard';
import TableOfProperties from './pages/admin/TableOfProperties';
import PropertyCreate from './components/property/PropertyCreate';

import Main from './pages/Main';
import TableOfTransactions from './pages/admin/TableOfTransactions';

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Cart from './components/Cart';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth/login', element: <LoginPage />, action: loginAction },
      { path: 'auth/register', element: <RegisterPage />, action: registerAction },
      { path: 'properties', element: <PropertiesPage /> },
      { path: 'property/:propertyId', element: <PropertyDetails /> },
      { path: 'postProperty', element: <PropertyCreate /> },
      { path: 'logout', action: logoutAction }
    ],
  },
  {
    path: '/admin',
    element: <Admin />,
    id: 'admin',
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'properties', element: <TableOfProperties /> },
      { path: 'transactions', element: <TableOfTransactions />},
    ],
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} />
//     <>

//       <BrowserRouter>

//         <Routes>
//           <Route path="/" element={ <Main /> }>
//             <Route index={ true } element={ <Home /> } />
//             <Route path='/auth' element={ <AuthPage/>}/>
//             <Route path="/properties" element={ <PropertiesPage /> } />
//             <Route path="/property/:propertyId" element={ <PropertyDetails /> } />
//           </Route>

//           <Route path="/admin" element={<Admin />}>
//             <Route index={true} element={<Dashboard />} />
//             <Route path="properties" element={<TableOfProperties />} />
//             <Route path="transactions" element={<TableOfTransactions />} />
//         <Routes>

//           <Route path="/" element={ <Main /> }>
//             <Route index={ true } element={ <Home /> } />
//             <Route path="/properties" element={ <PropertiesPage /> } />
//             <Route path="/property/:propertyId" element={ <PropertyDetails /> } />
//             <Route path='/auth' element={ <AuthPage /> } />
//             <Route path="/postProperty" element={ <PropertyCreate /> } />
//           </Route>


//           <Route path="/admin" element={ <Admin /> }>
//             <Route index={ true } element={ <Dashboard /> } />
//             <Route path="properties" element={ <TableOfProperties /> } />
//             <Route path="hello" element={ <h1>Hello world</h1> } />
//             <Route path="transactions" element={ <TableOfTransactions /> } />

//           </Route>
//         </Routes>
//       </BrowserRouter>

//     </>

//   )
// };

//     //       </Route>
//     //     </Routes>
//       </BrowserRouter>

//     </>
  );
}
