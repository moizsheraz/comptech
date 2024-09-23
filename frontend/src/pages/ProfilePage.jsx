import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TimeLineOne from '../components/TimeLineOne';
import profileCover from "../assets/profile-background.jpg"

// data 
import Cabinets from '../Data/CabinetData'; // data for cabinet
const ProfilePage = () => {
    let { name } = useParams();
    console.log(name);

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
    
    const user = users?.data?.find(user => user.name === name);
    console.log(user);
    

    // let Session = Cabinets.find((cabinet) => cabinet?.session == session);
    // let member = Session?.members.find((member) => member?.name.trim() == name.trim());
    return (
        <div className="h-full bg-gray-200 p-8">
            <div className="bg-white rounded-lg shadow-xl pb-8">
                <div className="w-full h-[250px] -translate-y-1">
                    <img src={profileCover} className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover outline-none" />
                </div>
                <div className="flex flex-col items-center -mt-20 select-none">
                    <img
                        src={user?.img?.url}
                        className="w-40 h-40 object-cover object-top border-4 border-white rounded-full z-10"
                    />
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-2xl select-all">{user?.name}</p>
                    </div>
                    <p className="text-gray-700">{user?.currentPosition} Comptech</p>
                    <p className="text-sm text-gray-500">{user?.team}</p>
                </div>
            </div>
            {/* career block  */}
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                <h4 className="text-xl text-gray-900 font-bold">Career at Comptech</h4>
                <div className="relative px-4">
                    <div className="absolute h-full border border-dashed border-opacity-20 border-secondary" />
                    {/* start::Timeline item */}
                    {
                        user?.career.map((Career) => {
                            return <TimeLineOne key={Career.id} team={Career.team} stage={Career.stage} />
                        })
                    }
                </div>
            </div>



            {/* about block  */}
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                <h4 className="text-xl text-gray-900 font-bold">About {user?.name}</h4>
                <p className="mt-2 text-gray-700 select-all">
                    {user?.about}
                </p>
            </div>
        </div>
    );

};

export default ProfilePage;