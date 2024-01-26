import { Routes, Route } from 'react-router-dom';
import LoginBox from './Component/LoginBox';
import HintId from './Component/StyledComponents/HintId';
import HintPw from './Component/StyledComponents/HintPw';
import Membership from './Component/StyledComponents/Membership';
import AlbumPage from './Component/AlbumPage';
import AnswerId from './Component/StyledComponents/AnswerId';
import AnswerPw from './Component/StyledComponents/AnswerPw';
import GalleryPage from './Component/Gallery/GalleryPage';
import ZoomImage from './Component/Gallery/ZoomImage';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<LoginBox />}></Route>
        <Route path="/album" element={<AlbumPage />}></Route>
        <Route path="/album/:title" element={<GalleryPage />}></Route>
        <Route path="/zoom" element={<ZoomImage />}></Route>
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
