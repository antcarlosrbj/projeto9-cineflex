import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

export default function Film() {


    const {idFilm} = useParams();

    const [sessions, setSessions] = useState([]);
    const [film, setFilm] = useState([]);

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilm}/showtimes`);

        promise.then(answer => {
            setFilm(answer.data);
            console.log(answer.data);
            setSessions(answer.data.days);
        });
        /* Não esquece do erro */
    }, []);

    return (
        <>
            <Header />
            <main className="mainFilm">
                <p>Selecione o horário</p>
                {sessions.map(session => {
                    return (
                        <div className="date">
                            <p>{`${session.weekday} - ${session.date}`}</p>
                            <div className="sessions">
                                {session.showtimes.map(time => {
                                    return (
                                        <div className="session">{time.name}</div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </main>
            <Footer img={film.posterURL} title={film.title} />
        </>
    );
}