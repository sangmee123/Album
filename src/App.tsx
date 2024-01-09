import { Routes, Route } from 'react-router-dom';
import LoginBox from './Component/LoginBox';
import HintId from './Component/StyledComponents/HintId';
import HintPw from './Component/StyledComponents/HintPw';
import Membership from './Component/StyledComponents/Membership';
import Album from './Component/Album';
import AnswerId from './Component/StyledComponents/AnswerId';
import AnswerPw from './Component/StyledComponents/AnswerPw';
import Gallary from './Component/Gallary';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<LoginBox />}></Route>
        <Route path="/album" element={<Album />}></Route>
        <Route path="/album/:title" element={<Gallary />}></Route>
        <Route path="/id" element={<HintId />}></Route>
        <Route path="/pw" element={<HintPw />}></Route>
        <Route path="/id/answerId" element={<AnswerId />}></Route>
        <Route path="/pw/answerPw" element={<AnswerPw />}></Route>
        <Route path="/membership" element={<Membership />}></Route>
      </Routes>
    </>
  );
}

export default App;
