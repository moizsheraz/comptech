
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';

function AddTeams() {
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState('');
    const [team, setTeam] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]); // State to manage the selected members. It will store the selected members objects
    const [members, setMembers] = useState([]);
    const [selectedMemberId, setSelectedMemberId] = useState([]); // State to manage the selected member ID
    const [resetSelect, setResetSelect] = useState(''); // State to reset the select value


    const handleMemberSelect = (e) => {
        const memberId = e.target.value;
        const member = members.data.find(m => m._id === memberId);
        if (member && !selectedMembers.some(m => m._id === member._id)) {
            setSelectedMembers([...selectedMembers, member]); // Add the selected members name to the state
            setSelectedMemberId([...selectedMemberId, member._id]); // Add the selected member ID to the state
            setResetSelect(''); // Reset the select value
        }
    };

    const removeMember = (member) => {
        setSelectedMembers(selectedMembers.filter(m => m.name !== member.name)); // Remove the selected members name from the state
        setSelectedMemberId(selectedMemberId.filter(m => m !== member._id)); // Remove the selected member ID from the state
    };

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/all`);
            setMembers(response.data);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/team/newteam`, {
                session,
                team,
                members: selectedMemberId
            });
            console.log(response);
            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Team added successfully',
                });
                setSession('');
                setTeam('');
                setSelectedMembers([]);
                setSelectedMemberId([]);
                setResetSelect('');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: response.data.message || 'An error occurred',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text:  error.response.data.message || 'Something went wrong!',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);


    return (<>
        <div className="min-h-screen bg-slate-200 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <form onSubmit={handleSubmit}>
                        <div className="max-w-md mx-auto">
                            <div className="flex items-center space-x-5">
                                <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                    <h2 className="leading-relaxed text-center text-3xl w-[30rem]">Add a Team</h2>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="flex flex-col space-y-4">
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Team Title</label>
                                        <select
                                            required={true}
                                            name="team"
                                            id="team"
                                            value={team}
                                            onChange={(e) => setTeam(e.target.value)}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        >
                                            <option value="#">---Select a team---</option>
                                            <option value="Media">Media</option>
                                            <option value="Management">Management</option>
                                            <option value="Documentation">Documentation</option>
                                            <option value="Logistics">Logistics</option>
                                            <option value="Hr & Promotion">Hr & Promotion</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Session</label>
                                        <select
                                            required={true}
                                            name="session"
                                            id="session"
                                            value={session}
                                            onChange={(e) => setSession(e.target.value)}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        >
                                            <option value="#">---Select a session---</option>
                                            <option value="2021">2021</option>
                                            <option value="2022">2022</option>
                                            <option value="2023">2023</option>
                                            <option value="2024">2024</option>
                                        </select>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="leading-loose">Team Members</label>
                                        <select
                                            name="members"
                                            id="members"
                                            value={resetSelect} // Bind the value to the state
                                            onChange={handleMemberSelect}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        >
                                            <option value="">---Select a member---</option>
                                            {members?.data?.map((member, index) => (
                                                <option key={index} value={member._id}>
                                                    {member.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="leading-loose">Selected Members</label>
                                        <div className="flex flex-wrap space-x-2">
                                            {selectedMembers.map((member, index) => (
                                                <div key={index} className="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md">
                                                    <span>{member.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeMember(member)}
                                                        className="text-red-500"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="pt-4 flex items-center space-x-4">
                                    <button disabled={loading} className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                                        Add Team
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    </>);
}

export default AddTeams;