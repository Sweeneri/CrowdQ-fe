import React, { useState } from 'react';
import './Home.css'
import Navigation from '../../components/nav/Navigation';

const Home = () => {

    return (
        <>
            <Navigation />
            <div className='container home-container'>
                <div className='card'>
                    <span><a href='/session/create'>Start a Session</a></span>
                    <span>or</span>
                    <span><a href='/session/join'>Join a Session</a></span>
                </div>
            </div>
        </>
    );
}

export default Home;