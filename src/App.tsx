import { Routes, Route } from 'react-router-dom';
import LoginBox from './Component/LoginBox';
import Hint from './Component/Hint';
import Membership from './Component/Membership';
import Album from './Component/Album';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<LoginBox />}></Route>
        <Route path="/album" element={<Album />}></Route>
        <Route path="/membership" element={<Membership />}></Route>
        <Route path="/hint" element={<Hint />}></Route>
      </Routes>
    </>
  );
}

export default App;
