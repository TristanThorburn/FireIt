import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className='errorPage'>
        <button className='infoButton'>
            🔥
            <p>404!</p>
        </button>
        <h2>The page you are looking for does not exist.</h2>
        <Link to='/login'>
            <button className='newItemButton deleteItemButton'>Back to Landing Screen</button>
        </Link>
      </div>
  )
}
