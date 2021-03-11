import React from 'react'
import SectionFooter from '../layout/SectionFooter'

const About = () => {
    return (
        <>
        <div className="main-page">
            <div className="row aboutWrapper">
                <div className="col-6 about-photo">
                    <div className="about-img-wrapper">
                        <img src="/images/react-1.svg" alt=""/>
                    </div>
                </div>
                <div className="col-6 about-content">
                    <div className="about-content-wrapper">
                        <div className="home-topline about-image-wrapper">
                            <img src="images/jeff-1.jpg" alt="" srcset=""/>
                        </div>
                        <h1 className="home-headline">
                        こんにちは！
                        </h1>
                        <p className="about-description">
                        Hi I'm Jeff!<br/> I'm a BS in Computer Engineering Graduate at Pamantasan ng Cabuyao.</p>
                    </div>
                </div>
            </div>
        </div>
        <SectionFooter />
        </>
    )
}

export default About
