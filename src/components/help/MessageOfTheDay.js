import github from '../../assets/github.png';
import website from '../../assets/website.png';
import linkedin from '../../assets/linkedin.png';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const MessageOfTheDay = (props) => {
    const {firstLogin, employeeNumber, employeeName, setMessageOfTheDay } = props

    const handleCloseModal = () => {
        if(firstLogin === 'true'){
            const docRef = doc(db, 'employees', employeeNumber)
            updateDoc(docRef, {
                firstLogin:'false',
            })
        }
        setMessageOfTheDay(false)
    }

    return(
        <div className='popUpModal'>
            <div className='messageOfTheDay'>
                <button onClick={handleCloseModal} className='closePad'>X</button>
                <button className='infoButton'>
                    🔥
                    <p>Welcome:</p>
                </button>
                {firstLogin === 'true'
                    ? <div className='welcomeMessage'>
                        <h2>{employeeName}!</h2>
                        <h3>This pop up is a one time prompt for newly created employee logins to remind you that there are info buttons throughout the app to help explain what should be possible in each component.</h3>
                        <h4>Thank YOU for checking out my project!</h4>
                        <h5>Additional thanks to Chris Kim, Neha Bhole, Charlotte Duppre and Colm O'Sullivan who helped catch bugs with their testing.</h5>

                        <footer>
                            <ul className='tristanLinks'>
                                <li>
                                    <a 
                                        href='https://www.github.com/TristanThorburn'
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <img src={github} alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href='https://www.tristanthorburn.com'
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <img src={website} alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href='https://www.linkedin.com/in/tristanthorburn/'
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <img src={linkedin} alt="" />
                                    </a>
                                </li>
                            </ul>
                            <p>My email: tristanthorburn@gmail.com</p>
                        </footer>
                    </div>
                    : <div className='welcomeMessage'>
                        <h2>{employeeName}!</h2>
                        <h3>Look for the INFO buttons for details on how to use each component.</h3>
                        <h4>Thank YOU for checking out my project!</h4>
                        <h5>Additional thanks to Chris Kim, Neha Bhole, Charlotte Duppre and Colm O'Sullivan who helped catch bugs with their testing.</h5>

                        <footer>
                            <ul className='tristanLinks'>
                                <li>
                                    <a 
                                        href='https://www.github.com/TristanThorburn'
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <img src={github} alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href='https://www.tristanthorburn.com'
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <img src={website} alt="" />
                                    </a>
                                </li>
                                <li>
                                    <a 
                                        href='https://www.linkedin.com/in/tristanthorburn/'
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        <img src={linkedin} alt="" />
                                    </a>
                                </li>
                            </ul>
                            <p>My email: tristanthorburn@gmail.com</p>
                        </footer>
                    </div>
                }
            </div>
        </div>
    )
}

export default MessageOfTheDay;