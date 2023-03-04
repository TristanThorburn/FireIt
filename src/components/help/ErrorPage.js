import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className='errorPage'>
        <h1>404!</h1>
        <p>The page you are looking for doesnt exist</p>
        <p><Link to='/'>Back to Dashboard</Link></p>
      </div>
  )
}
