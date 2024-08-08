
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useState } from "react";

function AddTeams() {

    const [session, setSession] = useState('');
    const [team, setTeam] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [members, setMembers] = useState([
        'Wajahat',
        'Yasir',
        'Moiz',
        'Saif',
        'Sohaib'
    ]);

    const handleMemberSelect = (e) => {
        const member = e.target.value;
        if (member && !selectedMembers.includes(member)) {
            setSelectedMembers([...selectedMembers, member]);
        }
    };

    const removeMember = (member) => {
        setSelectedMembers(selectedMembers.filter(m => m !== member));
    };


    return (<>
        <div className="min-h-screen bg-slate-200 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
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
                                        onChange={handleMemberSelect}
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                    >
                                        <option value="">---Select a member---</option>
                                        {members.map((member, index) => (
                                            <option key={index} value={member}>
                                                {member}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label className="leading-loose">Selected Members</label>
                                    <div className="flex flex-wrap space-x-2">
                                        {selectedMembers.map((member, index) => (
                                            <div key={index} className="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded-md">
                                                <span>{member}</span>
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
                                <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                                    Add Team
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default AddTeams;