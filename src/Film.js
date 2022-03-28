import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
                                        <Link to={"/session/" + time.id}><div className="session">{time.name}</div></Link> /* Enviar time.id pelo Link */
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