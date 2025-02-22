import { NavLink } from 'react-router-dom';
import logo from '../../assets/AzmirUddin.png';
import { IoIosCloseCircle } from 'react-icons/io';
import { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import axios from 'axios';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const { user, googleRegister, userLogout, setuser } = useContext(AuthContext)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const userLogoutHandler = () => {
        userLogout()
            .then(() => {
                console.log("logout");
            })
            .catch((error) => {

                console.log("err", error);

            });

    };

    const googleSignin = () => {
        googleRegister()
            .then((result) => {
                setuser(result.user);
                console.log(result.user);
                const userInfo = {
                    userName: result.user?.displayName,
                    userEmail: result.user?.email,
                    userphoto: result.user?.photoURL,
                    userRole: "User"
                }
                axios.post('https://task-management-server-olive-three.vercel.app/users', userInfo)
                    .then(result => {
                        setuser(result.data);
                        console.log(result.data);
                        // navigate('/')
                    })
            })
    }

    return (
        <div className='bg-[#000000] border-b border-[#5b5b5b15] shadow-sm backdrop-blur-md sticky z-10 top-0'>
            <div className='2xl:mx-52 xl:mx-20 lg:px-6 flex items-center justify-between py-3'>
                {/* Left Side - Logo */}
                <div className='flex items-center gap-2'>
                    <img className='sm:w-16 w-8' src={logo} alt="Azmir Uddin" />
                    <h1 className='sm:text-2xl text-white font-bold text-[12px]'>Azmir Uddin</h1>
                </div>

                {/* Right Side - Menu & Hire Me Button */}
                <div className='flex items-center gap-8'>
                    {/* Navigation Menu */}
                    <ul className="hidden text-white lg:flex text-lg gap-6">
                        <NavLink className={({ isActive }) => isActive ? 'text-red-500' : 'text-white'} to='/'>Task</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-red-500' : 'text-white'} to='/addtask'>Add Task</NavLink>
                        {/* <NavLink className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'} to='/services'>Services</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'} to='/contact'>Contact</NavLink> */}
                    </ul>

                    {/* Hire Me Button */}


                    {/* <ThemeToggle></ThemeToggle> */}
                 

                    <div className='flex items-center gap-3'> {
                        user ?
                            <button onClick={userLogoutHandler} className='sm:py-2 py-1 px-3 sm:text-md text-sm sm:px-4 bg-gradient-to-r from-[#72b626] to-yellow-500 rounded-full text-white font-bold'>
                                Logout
                            </button>
                            :
                            <button onClick={googleSignin} className='sm:py-2 py-1 px-3 sm:text-md text-sm sm:px-4 bg-gradient-to-r from-[#72b626] to-yellow-500 rounded-full text-white font-bold'>
                                Signin
                            </button>
                    }
                        <img className='w-[40px] rounded-full' src={user?.photoURL} alt="" /></div>

                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-8 6h8" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className='absolute right-5 top-14 bg-white shadow-lg rounded-md p-4 z-50'>
                                <button onClick={() => setIsDropdownOpen(false)}>
                                    <IoIosCloseCircle className='absolute right-2 top-2 text-black' size={25} />
                                </button>
                                <ul className='flex flex-col space-y-4'>
                                    <NavLink className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'} to='/'>Home</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'} to='/addtask'>About</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'} to='/services'>Services</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'} to='/contact'>Contact</NavLink>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
