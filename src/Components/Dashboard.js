import React, { useState, useEffect } from 'react';
import QueryForm from './QueryForm';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebaseconfig";
import { Link } from 'react-router-dom';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { TiFlag } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import RaisedQuery from './RaisedQuery';

function SidebarButton({ isOpen, onClick }) {

    return (
        <button
            className={`text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 lg:hidden`}
            onClick={onClick}
        >
            {isOpen ? (
                <svg
                    className="w-6 h-6 ml-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 18L18 6M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ) : (
                <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 6H20M4 12H20M4 18H20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </button>
    );
}

function Dashboard({ user, isloggedIn, setloggedIn }) {
    let navigate = useNavigate()
    useEffect(() => {
        if (!isloggedIn) {
            navigate("/")
        }
    })

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setTimeout(() => {
            setIsSidebarOpen(false);
        }, 3000);
    };

    const handleRaiseQueryClick = () => {
        setShowForm(true);
    };
    const handleRaisedQueryClick = () => {
        setShowForm(false)
    };

    const LogutUser = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            setloggedIn(false)
        })
    }
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleProfile = () => {
        navigate("/profile")
    }
    return (
        <div className="flex h-screen">
            <div
                className={`fixed inset-y-0 z-10 flex flex-col w-48 bg-gray-800 transform ease-in-out transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:relative lg:translate-x-0 lg:flex-shrink-0 lg:w-48`}
            >
                <div className="flex flex-col h-full mt-2">
                    <nav className="flex-grow">
                        <a
                            href="/dashboard"
                            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white mb-3"
                        >
                            <span className='ml-6'>Dashboard</span>
                        </a>
                        <p
                            onClick={handleRaisedQueryClick}
                            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white mb-3"
                        >
                            <TiFlag size={24} color='white' />
                            <span className='ml-1' style={{ cursor: "pointer" }}>Raised Queries</span>
                        </p>
                    </nav>
                    {isloggedIn &&
                        <div className="flex items-end pb-6">
                            <nav className="flex-grow">
                                <a
                                    href="/"
                                    className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 hover:text-white mb-3"
                                >
                                    <RiLogoutBoxLine size={24} color='white' className='ml-5' />

                                    <span onClick={LogutUser} as={Link}
                                        to="/login" className='ml-1'>Logout</span>
                                </a>
                            </nav>
                        </div>
                    }
                </div>
            </div>

            <div className="flex flex-col flex-1 overflow-hidden">
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
                    <SidebarButton isOpen={isSidebarOpen} onClick={handleSidebarToggle} />

                    <h2 className="text-xl font-semibold ml-1">Grievance Management</h2>
                    <img className="ml-auto mr-1" src={auth.currentUser?.photoURL} style={{ borderRadius: "15px" }} width="32px" height="32px" alt="Avatar" onClick={(e) => {
                        e.stopPropagation();
                        toggleDropdown();
                    }} />

                </header>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-14 p-2 mr-3 w-40 bg-white hover:bg-blue-100 rounded-md shadow-lg">
                        <option className='hover:bg-blue-200 rounded-md' onClick={LogutUser} style={{ cursor: "pointer" }}>Logout</option>
                        <option className='hover:bg-blue-200 rounded-md' onClick={handleProfile} style={{ cursor: "pointer" }}>View Profile</option>
                    </div>
                )}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                    {auth.currentUser?.email !== "linktothedeveloper@gmail.com" &&
                        <div className="flex-grow p-2 mr-1 mt-6">
                            <div className="flex justify-end">
                                <button
                                    onClick={handleRaiseQueryClick}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-1 px-4 rounded flex items-center"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="w-4 h-4 mr-2"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="16" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                    Raise a query
                                </button>
                            </div>

                        </div>
                    }
                    {!showForm && <RaisedQuery />}
                    {showForm && <QueryForm />}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
