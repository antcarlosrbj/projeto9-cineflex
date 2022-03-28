import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Film from './Film';
import Session from './Session';
import Success from './Success';

import './css/reset.css';
import './css/style.css';

function App() {

    const [finalData, setFinalData] = useState([]);


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home finalData={finalData} />}></Route>
                <Route path="/film/:idFilm" element={<Film />}></Route>
                <Route path="/session/:idSession" element={<Session setFinalData={setFinalData} />}></Route>
                <Route path="/success" element={<Success finalData={finalData} setFinalData={setFinalData}/>}></Route>
            </Routes>
        </BrowserRouter>
    );
};

ReactDOM.render(<App />, document.querySelector(".root"));