import { useState } from 'react';
import logo from '../../assets/images/Logo.png'
import {navItems} from '../../constants/index'

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const LandingNavbar = () => {
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    const toggleNavbar = () =>{
        setMobileDrawerOpen(!mobileDrawerOpen);
    };
  return (
    <nav className='sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80'>
        <div className='container px-4 mx-auto relative text-sm'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center flex-shrink-0'>
                    <img className='h-10 w-10 mr-2' src={logo} alt="logo" />
                    <span className="text-xl tracking-tight">Lizaso Laundry Hub</span>
                </div>
                <ul className='hidden lg:flex ml-14 space-x-12'>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                </ul>
                <div className="hidden lg:flex justify-center space-x-12 items-center">
                    <a href="#" className='py-2 px-2 border rounded-md'>Sign In</a>
                    <a href="#" className='text-white bg-gradient-to-r from-blue-500 to-blue-600 py-2 px-5 rounded-2xl'>Create Account</a>
                </div>
                <div className="lg:hidden md:flex flex-col justify-end">
                    <button onClick={toggleNavbar}>
                        {mobileDrawerOpen ? <CloseIcon/> : <MenuIcon/>}
                    </button>
                </div>
            </div>
            {mobileDrawerOpen && (
                <div className='fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden'>
                    {navItems.map((item, index) => (
                        <li key={index} className='py-4'>
                            <a href={item.href}>{item.label}</a>
                        </li>
                    ))}
                    <ul>
                        <div className="flex space-x-6">
                            <a href="#" className='py-2 px-2 border rounded-md'>Sign In</a>
                            <a href="#" className='text-white bg-gradient-to-r from-blue-500 to-blue-600 py-2 px-5 rounded-2xl'>Create Account</a>
                        </div>
                    </ul>
                </div>
            )}
        </div>
    </nav>
  )
}

export default LandingNavbar