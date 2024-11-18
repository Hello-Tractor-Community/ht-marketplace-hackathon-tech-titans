import { Routes, Route } from 'react-router-dom';
import Navbar from './Layout/Navbar';

const App = () => {
  return (
    <>
      <Navbar/>
    <Routes>
      {/* <Route path="/" element={<Homepage />} /> */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
    </>
  );
};

export default App;
