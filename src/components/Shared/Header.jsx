import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/task-logo.png';
import { IoIosCloseCircle } from 'react-icons/io';
import { useContext, useState } from 'react';
import { AuthContext } from '../../provider/AuthProvider';
import { FaUserCircle } from "react-icons/fa";
const Header = () => {
    const { user, userLogout, } = useContext(AuthContext)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate()
    const userLogoutHandler = () => {
        userLogout()
            .then(() => {
                navigate('/signip')
            })
            .catch((error) => {

                console.log("err", error);

            });

    };



    return (
        <div className='bg-[#000000] border-b border-[#5b5b5b15] shadow-sm backdrop-blur-md sticky z-10 top-0'>
            <div className='2xl:mx-36 xl:mx-20 lg:px-0 flex sm:mx-4 mx-1 items-center justify-between py-3'>
                {/* Left Side - Logo */}
                <div className='flex items-center gap-2'>
                    <img className='sm:w-10 w-5' src={logo} alt="Azmir Uddin" />
                    <h1 className='sm:text-2xl text-white font-bold text-[12px]'>Task Management</h1>
                </div>

                {/* Right Side - Menu & Hire Me Button */}
                <div className='flex items-center gap-8'>
                    {/* Navigation Menu */}
                    <ul className="hidden text-white lg:flex text-lg gap-6">
                        <NavLink className={({ isActive }) => isActive ? 'text-yellow-500 border-b' : 'text-white'} to='/'>Task</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-yellow-500 border-b' : 'text-white'} to='/addtask'>Add Task</NavLink>
                        {/* <NavLink className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'} to='/services'>Services</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-red-500' : 'text-black'} to='/contact'>Contact</NavLink> */}
                    </ul>

                    {/* Hire Me Button */}


                    {/* <ThemeToggle></ThemeToggle> */}

                    {
                        user ?
                            <div className='flex items-center gap-3'> {

                                <button onClick={userLogoutHandler} className='sm:py-2 py-1 px-3 sm:text-md text-sm sm:px-4 bg-gradient-to-r  text-white  rounded-2xl bg-yellow-600 font-bold'>
                                    Logout
                                </button>


                            }
                                <img className='w-[40px] rounded-full' src={user?.photoURL} alt="" /></div>
                                :
                        <FaUserCircle className='text-white text-3xl'/>
                     }



                    

                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='text-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-8 6h8" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className='absolute right-5 top-14 bg-black shadow-lg rounded-md p-4 z-50'>
                                <button onClick={() => setIsDropdownOpen(false)}>
                                    <IoIosCloseCircle className='absolute right-2 top-2 text-white' size={25} />
                                </button>
                                <ul className='flex flex-col space-y-4'>
                                    <NavLink className={({ isActive }) => isActive ? 'text-yellow-500 border-b' : 'text-white'} to='/'>Task</NavLink>
                                    <NavLink className={({ isActive }) => isActive ? 'text-yellow-500 border-b' : 'text-white'} to='/addtask'>Add Task</NavLink>
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
