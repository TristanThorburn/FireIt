import github from '../../assets/github.png'
import website from '../../assets/website.png'
import linkedin from '../../assets/linkedin.png'
import squirrel from '../../assets/squirrel.png'

const AppLandingInfo = (props) => {
    const handleExitInfoPage = () => {
        props.setAppInfo(false)
    }

    return(
        <div className='appLandingInfo'>
            <div className='appLandingInfoNav'>
                <button onClick={handleExitInfoPage}>Back to Login</button>
                <h2>ABOUT FIRE IT:</h2>
            </div>
            
            <div className='ulsContainer'>
                <ul className='qAndA'>
                    <li>
                        <p>Last update to this page: March 3, 2023.</p>
                    </li>
                    <li>
                        <p>What is Fire It?</p>
                        <p>I created this app to see how much of the logic from touch screen restaurant and bar point of sale systems I could replicate.</p>
                    </li>
                    <li>
                        <p>Why did I want to try to replicate them?</p>
                        <p>My previous work history involves over 10 years in the restaurant industry. During the four recent years before starting to make an industry change a large part of my roles became technology based, primarily working with the Squirrel Systems GUI. Things like menu changes, specials, employee additions and other customizations offered me many hours of working with this system teaching myself through documentation and late nights of trials, errors and reboots in order meet these changing needs.
                        </p>
                        <p>In August 2022 I decided I wanted to focus more on technology and attended a Front End Developer boot camp offered by <a href='https://junocollege.com/' target='_blank' rel='noreferrer' className='junoCollege'>Juno College</a> in Toronto. In January 2023 after graduating I realized I wanted to better blend the two industries together to match my experience, and Fire It was born.</p>
                        <p>Lastly I wanted to create something that wasnt just another YouTube tutorial or repeat project from the bootcamp, something where I didnt have easy access to solutions and would have to logic out results on my own as much as possible.</p>
                        <a
                            className='squirrelLink'
                            href='https://www.squirrelsystems.com/'
                            target='_blank'
                            rel='noreferrer'
                        >
                            <img src={squirrel} alt="" />
                        </a>
                    </li>
                    <li>
                        <p>What is involved in Fire It?</p>
                        <p>This is a React.JS project. Firebase handles user authorization from email/password, as well as data for employees, menu items, table map layout, checks etc. Any styling is written in SASS. I have not installed any packages aside from a brief stint of Font Awesome, I wanted to figure out as much as I can myself.</p>
                    </li>
                    <li>
                        <p>How do you use this app?</p>
                        <p>Each section of this app will contain a guide that provides more information on how to use them.</p>
                    </li>
                    <li>
                        <p>What is the MVP?</p>
                        <p>User auth from Firebase. CRUD for employees, menu items, table map layout in the 'backend'. The ability to punch in items based on server & table & seat, as well as delete and promo. Styling is not a focus as I want to spend more time manipulating data than coloring buttons. Most of this is functional. Please be advised these apps are used by desktop terminals and tablets, at the moment it is styled for w:1920px</p>
                    </li>
                    <li>
                        <p>Who is the creator?</p>
                        <p>My name is Tristan Thorburn, I'm currently located in Toronto, feel free to check out my Github, Portfolio or LinkedIn.</p>
                    </li>
                    <li>
                        <p>Fire?</p>
                        <p>This is a term used by the head chef to let others in the kitchen know it's time to start cooking or prepping a dish.</p>
                    </li>
                </ul>
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
            </div>
        </div>
    )
}

export default AppLandingInfo