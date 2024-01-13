import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

/*
    Provider는 store가 리액트앱 전체를 감싸도록 해주는 애다. 
    그리고 store라는 파라미터를 전달해준다.
*/