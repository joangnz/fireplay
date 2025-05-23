'use client';

import { useEffect, useState } from 'react';
import $ from 'jquery';

import { newPfp } from '@/lib/requests';

import Edit from "../../../public/edit.svg";
import "@/styles/profile.css";

export default function Profile() {
    const [username, setUsername] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string>("https://www.lavanguardia.com/peliculas-series/images/profile/2023/2/w300/hugJtkZDUXbKdEWXbl5rz3qrOMQ.jpg");
    const [selectedSection, setSelectedSection] = useState<string>("favoritos");
    const [fileInput, setFileInput] = useState<File | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        storedUsername ? setUsername(storedUsername) : window.location.href = '/login';

        const storedProfilePic = localStorage.getItem('profilePic') || profilePic;
        setProfilePic(storedProfilePic);
    }, []);

    const handleUsernameChange = (e: any) => {
        const newUsername = $(e.currentTarget).val()
        console.log(newUsername);
    }

    const handleOverlayClick = () => {
        const fileInputElement = document.getElementById('pfp-file') as HTMLInputElement;
        if (fileInputElement) {
            fileInputElement.click();
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileInput(file);
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfilePic(reader.result as string);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('pfpFile', file);
            formData.append('username', username);

            try {
                newPfp(formData);
            } catch (error) {
                
            }
        }
    };


    return (
        <section className='main-info p-8 w-2/3 m-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
            <input id="pfp-file" className="hide" type="file" name="pfp-file"  accept='image/jpeg, image/png, image/jpg' onChange={handleFileChange} />
            <div id="pfp-wrap">
                <img src={profilePic} alt="Profile Picture" id="pfp" />
                <div className="w-full h-full overlay flex" onClick={handleOverlayClick}>
                    Click to upload!
                </div>
            </div>
            <div id="username" className="col-span-2">
                <input className='text-xl font-bold tracking-wide inline' value={username} onChange={handleUsernameChange} /> <Edit className="inline pointer"></Edit>
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