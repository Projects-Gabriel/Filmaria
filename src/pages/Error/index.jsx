import { Link } from 'react-router-dom';
import notFound from '../../assets/images/error.jpg';
import './error.css';


export default function Error () {
    return (
        <div className="error-page">
            <img src={notFound} alt="Error" />
            <Link to="/">Veja todos os filmes!</Link>
        </div>
    );
}