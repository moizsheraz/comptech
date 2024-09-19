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
    
    return (
        <div className='w-full min-h-screen flex items-center  bg-slate-200 flex-col gap-7 py-7'>
            {
                filteredUsers?.map((user, index) => {
                    return (
                        <div className="cabinet flex flex-col w-10/12" key={index}>
                            <div className="flex flex-nowrap w-full m-auto mb-3">
                                <h1 className='text-xl md:text-2xl font-bold text-comptech-950 uppercase border-s-4 bg-slate-400 px-5 border-comptech-950 pl-3 text-nowrap'>{name}</h1>
                                {/* <h1 className='text-xl md:text-2xl font-bold text-comptech-950 uppercase border-s-4 bg-slate-400 px-5 border-comptech-950 pl-3 text-nowrap'>{cabinet.session}</h1> */}
                            </div>
                            {/* Members part  */}
                            <div className="flex items-start justify-start min-h-screen bg-white py-10">
                                <div className="flex flex-col">
                                    <div className="flex flex-col mt-3">
                                        <div className="container max-w-7xl px-4">

                                            <div className="flex flex-wrap">
                                                {/* team holder */}
                                                
                                                <TeamMember key={user._id} member={user} />
                                                


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* cabinet ends */}

                        </div>
                    )
                })
            }
        </div >
    )
}

export default Teams;
