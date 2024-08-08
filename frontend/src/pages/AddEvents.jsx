
import { CiStopwatch } from "react-icons/ci";
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useState } from "react";

function AddEvents() {
    const [keyPoints, setKeyPoints] = useState([]);

    const addKeyPoint = () => {
        setKeyPoints([...keyPoints, { name: '', explanation: '' }]);
    };

    const removeKeyPoint = (index) => {
        const newKeyPoints = keyPoints.filter((_, i) => i !== index);
        setKeyPoints(newKeyPoints);
    };

    const handleInputChange = (index, field, value) => {
        const newKeyPoints = keyPoints.map((keyPoint, i) =>
            i === index ? { ...keyPoint, [field]: value } : keyPoint
        );
        setKeyPoints(newKeyPoints);
    };

    return (<>
        <div className="min-h-screen bg-slate-200 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed text-center text-3xl w-[30rem]">Create an Event</h2>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="flex flex-col">
                                    <label className="leading-loose">Event Title</label>
                                    <input
                                        type="text"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Event title"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Event Image/Poster</label>
                                    <input
                                        type="file"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Optional"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col w-1/2">
                                        <label className="leading-loose">Event Date</label>
                                        <div className="relative focus-within:text-gray-600 text-gray-400">
                                            <input
                                                type="date"
                                                className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                placeholder="25/02/2020"
                                            />
                                            <div className="absolute left-3 top-2">
                                                <svg
                                                    className="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-1/2">
                                        <label className="leading-loose">Event Time</label>
                                        <div className="relative focus-within:text-gray-600 text-gray-400">
                                            <input
                                                type="time"
                                                className="pr-4 pl-10 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                placeholder="26/02/2020"
                                            />
                                            <div className="absolute left-3 top-2">
                                                <CiStopwatch className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Event Location</label>
                                    <input
                                        type="text"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Event Location"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Event Description</label>
                                    <input
                                        type="text"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Event Description"
                                    />
                                </div>

                                {/* speaker can be anyone beshak wo databse mai nah hoo. Some times bahir sa speaker bula leta hain taht's why input text */}
                                <div className="flex flex-col">
                                    <label className="leading-loose">Speaker</label>
                                    <input
                                        type="text"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Dr. Aun Irtiza"
                                    />
                                </div>


                                <div className="flex flex-col">
                                    <label className="leading-loose">Featured</label>
                                    <div className="flex flex-row space-x-4">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="featured"
                                                value={true}
                                                className="border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            />
                                            <span>Yes</span>
                                        </label>
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name="featured"
                                                value={false}
                                                className="border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            />
                                            <span>No</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <label className="leading-loose">Category</label>
                                    <input
                                        type="text"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Event Category"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Event Collaboration</label>
                                    <input
                                        type="text"
                                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Society Name (Optional)"
                                    />
                                </div>


                                {/* event points  */}
                                <div className="flex flex-col">
                                    <label className="leading-loose">Event Points</label>
                                    <button
                                        type="button"
                                        onClick={addKeyPoint}
                                        className="flex items-center px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                    >
                                        <FaPlus className="mr-2" /> Add Key Point
                                    </button>
                                    {keyPoints.map((keyPoint, index) => (
                                        <div key={index} className="flex flex-row items-center space-x-4 mt-4">
                                            <input
                                                type="text"
                                                value={keyPoint.name}
                                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                placeholder="Key Point Name"
                                            />
                                            <input
                                                type="text"
                                                value={keyPoint.explanation}
                                                onChange={(e) => handleInputChange(index, 'explanation', e.target.value)}
                                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                placeholder="Explanation"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeKeyPoint(index)}
                                                className="text-gray-400"
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                {/* end points */}





                            </div>
                            <div className="pt-4 flex items-center space-x-4">
                                <button className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none">
                                    Create Event
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default AddEvents;