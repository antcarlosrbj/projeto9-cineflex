export default function Footer({img, title, session}) {
    return (
        <footer>
            <img src={img} alt="Poster" />
            <div className="infoFilm">
                <p>{title}</p>
                { session ? <p>{session}</p> : ""}
            </div>
        </footer>
    );
}