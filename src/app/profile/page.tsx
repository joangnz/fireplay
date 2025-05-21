'use client';

import { useEffect, useState } from 'react';

import Edit from "../../../public/edit.svg";

import "@/styles/profile.css";

export default function Profile() {
    const [username, setUsername] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string>("https://www.lavanguardia.com/peliculas-series/images/profile/2023/2/w300/hugJtkZDUXbKdEWXbl5rz3qrOMQ.jpg");
    const [selectedSection, setSelectedSection] = useState<string>("favoritos");

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        storedUsername ? setUsername(storedUsername) : window.location.href = '/login';

        const storedProfilePic = localStorage.getItem('profilePic') || profilePic;
        setProfilePic(storedProfilePic);
    }, []);


    return (
        <section className='main-info p-8 w-2/3 m-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
            <div id="pfp-wrap">
                <img src={profilePic} alt="Profile Picture" id="pfp" />
                <div className="w-full h-full overlay flex">Click to upload!</div>
            </div>
            <div id="username" className="col-span-2">
                <h1 className='text-xl font-bold tracking-wide inline'>{username}</h1> <Edit className="inline pointer"></Edit>
            </div>

            <div className='w-full text-center col-span-3 flex grid grid-cols-3 col-gap-6'>
                <div className={'selectField' + (selectedSection == 'favoritos' ? ' selected' : '')} onClick={() => setSelectedSection('favoritos')}>
                    <h2>Favoritos</h2>
                </div>
                <div className={'selectField' + (selectedSection == 'compras' ? ' selected' : '')} onClick={() => setSelectedSection('compras')}>
                    <h2>Compras</h2>
                </div>
                <div className={'selectField' + (selectedSection == 'reviews' ? ' selected' : '')} onClick={() => setSelectedSection('reviews')}>
                    <h2>Reseñas</h2>
                </div>
            </div>
            <div className='col-span-3'>

            </div>
        </section>
    )
}