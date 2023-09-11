import {Routes,Route } from 'react-router-dom';
import UserRoute from './Routes/UserRoute.js'
import AdminRoute from './Routes/AdminRoute.js';
import PartnerRoute from './Routes/PartnerRoute.js';


function App() {
  return (
<>
  <Routes>
    <Route  path='/*' element={<UserRoute/>}/>
    <Route  path='/admin/*' element={<AdminRoute/>}/>
    <Route  path='/partner/*' element={<PartnerRoute/>}/>
  </Routes>
</>
  );
}

export default App;
