'use client';

import { useEffect, useState } from 'react';
import $ from 'jquery';

import { changeUsername, newPfp, getPfp } from '@/lib/requests';

import FavoritesPage from '../favorites/page';

import Edit from "../../../public/edit.svg";
import "@/styles/profile.css";

export default function Profile() {
    const [username, setUsername] = useState<string>("");
    const [newUsername, setNewUsername] = useState<string>("");
    const [profilePic, setProfilePic] = useState<string>("https://www.lavanguardia.com/peliculas-series/images/profile/2023/2/w300/hugJtkZDUXbKdEWXbl5rz3qrOMQ.jpg");
    const [fileInput, setFileInput] = useState<File | null>(null);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username') || '';
        if (storedUsername) {
            setUsername(storedUsername); setNewUsername(storedUsername)
        } else window.location.href = '/login';

        const fetchPfp = async () => {
            try {
                const res = await getPfp(storedUsername);
                if (res?.data?.route) {
                    setProfilePic(res.data.route);
                }
            } catch (error) {
                console.error("Failed to fetch profile picture", error);
            }
        };

        fetchPfp();
    }, []);

    const handleUsernameChange = (e: any) => {
        setNewUsername($(e.currentTarget).val());
    }

    const handleUsernameSubmit = async () => {
        const res = await changeUsername(username, newUsername);

        if (res?.data.success) {
            localStorage.setItem('username', newUsername);
            setUsername(newUsername);
        }
    }

    const handleOverlayClick = () => {
        const fileInputElement = $('#pfp-file')[0] as HTMLInputElement;
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
                newPfp(formData).then((res: any) => {
                    setProfilePic(res.data.path);
                });
            } catch (error) {
            }
        }
    };


    return (
        <section className='main-info p-8 w-2/3 m-auto grid grid-cols-1 md:grid-cols-3 gap-6'>
            <input id="pfp-file" className="hide" type="file" name="pfp-file" accept='image/jpeg, image/png, image/jpg' onChange={handleFileChange} />
            <div id="pfp-wrap">
                <img src={profilePic} alt="Profile Picture" id="pfp" />
                <div className="w-full h-full overlay flex" onClick={handleOverlayClick}>
                    Click to upload!
                </div>
            </div>
            <div id="username" className="col-span-2">
                <input className='text-xl font-bold tracking-wide inline' value={newUsername} onChange={handleUsernameChange} /> <Edit className="inline pointer" onClick={handleUsernameSubmit}></Edit>
            </div>

            <div className='col-span-3'>
                {FavoritesPage()}
            </div>
        </section>
    )
}