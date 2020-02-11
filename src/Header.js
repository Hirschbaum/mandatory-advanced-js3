import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <div className='header-register-login'>
                <div className='header-logo-container'>
                    <div className="header-logo"> do</div>
                    <h3>todos</h3>
                </div>

                <div className='header-links-container'>
                    <Link to='/register' className='header-links'>Register</Link>
                    <Link to='/login' className='header-links right'>Login</Link>
                </div>
            </div>
        )
    }
}

export default Header;