
import { CiStopwatch } from "react-icons/ci";
import { FaPlus, FaTimes } from 'react-icons/fa';
import { useState } from "react";
import Swal from 'sweetalert2';
import axios from "axios";

function AddEvents() {
    const [loading, setLoading] = useState(false);
    const [keyPoints, setKeyPoints] = useState([]);
    const [title, settitle] = useState("");
    const [date, setdate] = useState("");
    const [time, settime] = useState("");
    const [location, setlocation] = useState("");
    const [description, setdescription] = useState("");
    const [isFeatured, setisFeatured] = useState(false);
    const [eventimg, seteventimg] = useState();
    const [category, setcategory] = useState("");
    const [collaboration, setcollaboration] = useState("");
    const [spokesPersonName, setspokesPersonName] = useState("");
    const [spokesPersonDescription, setspokesPersonDescription] = useState("");
    const [spokesPersonImage, setspokesPersonImage] = useState();
    const [spokesPersonSocials, setspokesPersonSocials] = useState([]);

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

    const addSocial = () => {
        setspokesPersonSocials([...spokesPersonSocials, { name: '', url: '' }]);
    };

    const removeSocial = (index) => {
        const newSocials = spokesPersonSocials.filter((_, i) => i !== index);
        setspokesPersonSocials(newSocials);
    };

    const handleSocialInputChange = (index, field, value) => {
        const newSocials = spokesPersonSocials.map((social, i) =>
            i === index ? { ...social, [field]: value } : social
        );
        setspokesPersonSocials(newSocials);
    };

    const handleSpokesPersonImageChange = (e) => {
        setspokesPersonImage(e.target.files[0]);
    };


    const handleImageChange = (e) => {
        // const reader = new FileReader();
        // reader.onload = () => {
        //     if (reader.readyState === 2) {
        //         seteventimg(reader.result);
        //     }
        // }
        // reader.readAsDataURL(e.target.files[0]);
        seteventimg(e.target.files[0]);
    }

    const validateForm = () => {
        console.log(spokesPersonSocials);
        
        if (!date || !time || !location || !title || !collaboration || !description || !spokesPersonName || !spokesPersonDescription || !spokesPersonImage || spokesPersonSocials.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Event Creation Failed',
                text: "Please fill all the fields",
            });
            return false;
        }
        for (let social of spokesPersonSocials) {
            if (!social.name || !social.url) {
                Swal.fire({
                    icon: 'error',
                    title: 'Event Creation Failed',
                    text: "Please fill all the social media fields",
                });
                return false;
            }
        }
        return true;
    };

    const resetForm = () => {
        setdate("");
        settime("");
        setlocation("");
        setdescription("");
        setspokesPersonName("");
        setspokesPersonDescription("");
        setspokesPersonImage(null);
        setspokesPersonSocials([]);
        setisFeatured(false);
        seteventimg(null);
        setcategory("");
        setcollaboration("");
        setKeyPoints([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!validateForm()) return;
        
        const spokesPerson = {
            name: spokesPersonName,
            description: spokesPersonDescription,
            socials: spokesPersonSocials,
        };

        const formdata = new FormData();
        formdata.append('image', eventimg);
        formdata.append('person', spokesPersonImage);
        formdata.append('title', title);
        formdata.append('date', date);
        formdata.append('time', time);
        formdata.append('location', location);
        formdata.append('description', description);
        formdata.append('spokesPerson', JSON.stringify(spokesPerson));
        formdata.append('isFeatured', isFeatured);
        formdata.append('category', category);

        if (keyPoints.length > 0) {
            const jsonConvertedKeyPoints = JSON.stringify(keyPoints);
            formdata.append('keyPoints', jsonConvertedKeyPoints);
        }
        if (collaboration) {
            formdata.append('collaboration', collaboration);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/event/create`, formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Event Created Successfully',
                    text: response.data.message,
                });
                resetForm();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Event Creation Failed',
                    text: response.data.message || 'An error occurred',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred',
                text: error.message,
            });
        } finally {
            setLoading(false);
        }
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
                        <form onSubmit={handleSubmit}>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Event Title</label>
                                        <input
                                            type="text"
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Event title"
                                            value={title}
                                            onChange={(e) => settitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Event Image/Poster</label>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Optional"
                                            required
                                            onChange={handleImageChange}
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
                                                    value={date}
                                                    onChange={(e) => setdate(e.target.value)}
                                                    required
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
                                                    value={time}
                                                    onChange={(e) => settime(e.target.value)}
                                                    required
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
                                            value={location}
                                            onChange={(e) => setlocation(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Event Description</label>
                                        <input
                                            type="text"
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Event Description"
                                            value={description}
                                            onChange={(e) => setdescription(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {/* speaker can be anyone beshak wo databse mai nah hoo. Some times bahir sa speaker bula leta hain taht's why input text */}
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Speaker Name</label>
                                        <input
                                            type="text"
                                            value={spokesPersonName}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            onChange={(e) => setspokesPersonName(e.target.value)}
                                            placeholder="Spokesperson Name"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Speaker Description</label>
                                        <textarea
                                            value={spokesPersonDescription}
                                            onChange={(e) => setspokesPersonDescription(e.target.value)}
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Spokesperson Description"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Speaker Image</label>
                                        <input
                                            type="file"
                                            id="fileInput"
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Optional"
                                            required
                                            onChange={handleSpokesPersonImageChange}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Social Media Links</label>
                                        <button
                                            type="button"
                                            onClick={addSocial}
                                            className="flex items-center px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        >
                                            <FaPlus className="mr-2" /> Add Social Media Links
                                        </button>
                                        {spokesPersonSocials.map((social, index) => (
                                            <div key={index} className="flex flex-row items-center space-x-4 mt-4">
                                                <input
                                                    type="text"
                                                    value={social.name}
                                                    onChange={(e) => handleSocialInputChange(index, 'name', e.target.value)}
                                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                    placeholder="Name"
                                                />
                                                <input
                                                    type="text"
                                                    value={social.url}
                                                    onChange={(e) => handleSocialInputChange(index, 'url', e.target.value)}
                                                    className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                    placeholder="Link"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeSocial(index)}
                                                    className="text-gray-400"
                                                >
                                                    <FaTimes />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Featured</label>
                                        <div className="flex flex-row space-x-4">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="featured"
                                                    value="yes"
                                                    checked={isFeatured === true}
                                                    onChange={(e) => setisFeatured(true)}
                                                    className="border focus:ring-gray-500 focus:border-gray-900 sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                                />
                                                <span>Yes</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="featured"
                                                    value="no"
                                                    checked={isFeatured === false}
                                                    onChange={(e) => setisFeatured(false)}
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
                                            value={category}
                                            onChange={(e) => setcategory(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="leading-loose">Event Collaboration</label>
                                        <input
                                            type="text"
                                            className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                            placeholder="Society Name (Optional)"
                                            value={collaboration}
                                            onChange={(e) => setcollaboration(e.target.value)}
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
                                    <button type="submit" className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none" disabled={loading}>
                                        Create Event
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </>);
}

export default AddEvents;