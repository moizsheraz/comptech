import React, { useEffect, useState } from 'react';
import TeamMember from '../components/Cabinet_Components/TeamMember';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Teams = () => {
    let { name } = useParams();

    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/all`);
            setUsers(response.data);
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);
    const filteredUsers = users?.data?.filter(user => user.team === name);
    const AD = filteredUsers?.filter(user => user.currentPosition === 'Assistant Director');
    const EX = filteredUsers?.filter(user => user.currentPosition === 'Executive');
    const GM = filteredUsers?.filter(user => user.currentPosition === 'General Member');
    const LT = filteredUsers?.filter(user => user.currentPosition === 'Left Team');

    return (
        <div className='w-full min-h-screen flex items-center  bg-slate-200 flex-col gap-7 py-7'>
            <div className="cabinet flex flex-col w-10/12">
                <div className="flex flex-nowrap w-full m-auto mb-3">
                    <h1 className='text-xl md:text-2xl font-bold text-comptech-950 uppercase border-s-4 bg-slate-400 px-5 border-comptech-950 pl-3 text-nowrap'>{name}</h1>
                    {/* <h1 className='text-xl md:text-2xl font-bold text-comptech-950 uppercase border-s-4 bg-slate-400 px-5 border-comptech-950 pl-3 text-nowrap'>{cabinet.session}</h1> */}
                </div>
                {/* Members part  */}
                <div className="flex items-start justify-start min-h-screen bg-white py-10">
                    <div className="flex flex-col">
                        <div className="flex flex-col mt-3">
                            {
                                AD?.length > 0 && <div className="container max-w-7xl px-4">
                                    <h1>Assistent Director</h1>
                                    <div className="flex">
                                        {/* team holder */}
                                        {AD?.map(user => (
                                            <TeamMember member={user} key={user._id} />
                                        ))}
                                    </div>
                                </div>
                            }
                            {
                                EX?.length > 0 && <div className="container max-w-7xl px-4">
                                    <h1>Executive</h1>
                                    <div className="flex">
                                        {/* team holder */}
                                        {EX?.map(user => (
                                            <TeamMember member={user} key={user._id} />
                                        ))}
                                    </div>
                                </div>
                            }
                            {
                                GM?.length > 0 && <div className="container max-w-7xl px-4">
                                    <h1>General Member</h1>
                                    <div className="flex">
                                        {/* team holder */}
                                        {GM?.map(user => (
                                            <TeamMember member={user} key={user._id} />
                                        ))}
                                    </div>
                                </div>
                            }
                            {
                                LT?.length > 0 && <div className="container max-w-7xl px-4">
                                    <h1>Left Team</h1>
                                    <div className="flex">
                                        {/* team holder */}
                                        {LT?.map(user => (
                                            <TeamMember member={user} key={user._id} />
                                        ))}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Teams;
