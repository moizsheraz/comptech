import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaPlus, FaTimes } from 'react-icons/fa';
import { RiLockPasswordFill } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { PiPasswordDuotone } from "react-icons/pi";
import { FcAddImage } from "react-icons/fc";
import { MdOutlinePermIdentity } from "react-icons/md";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { SiOpensourcehardware } from "react-icons/si";
import Swal from 'sweetalert2';
import "../css/Register.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [team, setTeam] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('');
    const [session, setSession] = useState("");
    const [currentPosition, setcurrentPosition] = useState("");
    const [department, setDepartment] = useState("");
    const [about, setAbout] = useState("");
    const [socialMedia, setsocialMedia] = useState([]);

    const currentYear = new Date().getFullYear();
    const sessionYears = Array.from({ length: 4 }, (_, i) => currentYear - i);

    const addsocialMedia = () => {
        setsocialMedia([...socialMedia, { name: '', link: '' }]);

    };

    const removesocialMedia = (index) => {
        const newsocialMedia = socialMedia.filter((_, i) => i !== index);
        setsocialMedia(newsocialMedia);
    };

    const handleInputChange = (index, field, value) => {
        const newsocialMedia = socialMedia.map((social, i) =>
            i === index ? { ...social, [field]: value } : social
        );
        setsocialMedia(newsocialMedia);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const Formdata = new FormData();
        Formdata.append('name', name);
        Formdata.append('email', email);
        Formdata.append('session', session);
        Formdata.append('team', team);
        Formdata.append('currentPosition', currentPosition);
        Formdata.append('department', department);
        Formdata.append('about', about);
        Formdata.append('image', avatar);

        if (socialMedia.length > 0) {
            const jsonConvertedsocialMedia = JSON.stringify(socialMedia);
            Formdata.append('socialMedia', jsonConvertedsocialMedia);
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, Formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: response.data.message,
                });
                setName('');
                setEmail('');
                setSession('');
                setTeam('');
                setcurrentPosition('');
                setDepartment('');
                setAbout('');
                setAvatar(null);
                navigate('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: response.data.message || 'An error occurred',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'An Error Occurred',
                text: error.response.data.message || 'An error occurred',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(e.target.files[0]);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSessionChange = (e) => {
        const selectedYear = e.target.value;
        setSession(selectedYear);

        let position = '';
        switch (selectedYear) {
            case `${currentYear}`:
                position = 'General Member';
                break;
            case `${currentYear - 1}`:
                position = 'Executive';
                break;
            case `${currentYear - 2}`:
                position = 'Assistent Director';
                break;
            case `${currentYear - 3}`:
                position = 'Cabinet';
                break;
            default:
                position = '';
        }
        setcurrentPosition(position);
    };

    return (
        <div className="login_signup_container bg-slate-200">
            <form className="form" method='post' onSubmit={handleSubmit}>
                <h1 className="text-2xl font-bold text-slate-800 text-left flex gap-4 items-center">Create an account</h1>
                <div className="flex-column">
                    <label>Name</label>
                </div>
                <div className="inputForm">
                    <MdOutlinePermIdentity />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="Enter your name" required />
                </div>
                <div className="flex-column">
                    <label>Email</label>
                </div>
                <div className="inputForm">
                    <HiOutlineMail />
                    <input type="email" autoComplete={"true"} value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="22-CS-66@students.uettaxila.edu.pk" required />
                </div>
                <div className="flex-column">
                    <label>Session</label>
                </div>
                <div className="inputForm">
                    <MdOutlineSupervisorAccount />
                    <select
                        required={true}
                        name="session"
                        id="session"
                        onChange={handleSessionChange}
                        className="px-4 py-2 w-full sm:text-sm border-gray-300 rounded-md text-gray-600"
                    >
                        <option value="#">---Select a session---</option>
                        {sessionYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="flex-column">
                    <label>Current Position</label>
                </div>
                <div className="inputForm">
                    <MdOutlinePermIdentity />
                    <input type="text" value={currentPosition} className="input" readOnly placeholder='Please Select Your Session' />
                </div>
                <div className="flex-column">
                    <label>Team</label>
                </div>
                <div className="inputForm">
                    <MdOutlinePermIdentity />
                    <select
                        required={true}
                        name="team"
                        id="team"
                        onChange={(e) => setTeam(e.target.value)}
                        className="px-4 py-2 w-full sm:text-sm border-gray-300 rounded-md text-gray-600"
                    >
                        <option value="#">---Select a team---</option>
                        <option value="Management">Management</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Decor">Decor</option>
                        <option value="Media">Media</option>
                        <option value="DevOps">DevOps</option>
                        <option value="HR">HR</option>
                        <option value="Left">Left</option>
                    </select>
                </div>
                <div className="flex-column">
                    <label>Department</label>
                </div>
                <div className="inputForm">
                    <SiOpensourcehardware />
                    <select
                        required={true}
                        name="department"
                        id="department"
                        onChange={(e) => setDepartment(e.target.value)}
                        className="px-4 py-2 w-full sm:text-sm border-gray-300 rounded-md text-gray-600"
                    >
                        <option value="#">---Select a department---</option>
                        <option value="CS">Computer Science</option>
                        <option value="SE">Software Engineering</option>
                        <option value="ME">Mechanical</option>
                        <option value="CE">Civil Engineering</option>
                    </select>
                </div>
                <div className="flex-column flex">
                    <label>About</label>
                    <label className="text-xs"></label>
                </div>
                <div className="inputForm focus:border focus:border-slate-400">
                    <textarea
                        className="input w-[90%]"
                        value={about}
                        required
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Give some good professional details about yourself to be displayed in your profile"
                    />
                </div>
                <div className="relative">
                    <input
                        type="file"
                        id="fileInput"
                        accept='image/*'
                        className="invisible"
                        onChange={handleImageChange}
                        required
                    />


                    <label htmlFor="fileInput" className="cursor-pointer">
                        <div className="flex items-center">
                            {
                                avatar ? <img src={avatarPreview} className="h-16 w-16 rounded-full object-cover object-top border-2 p-1 border-slate-800" alt="" /> : <div className="p-2 bg-blue-500 text-white rounded-full">
                                    <FcAddImage className="h-6 w-6" />
                                </div>
                            }
                            <div className="ml-2 text-slate-900">Upload Image</div>
                        </div>
                    </label>
                </div>
                {/* Social Media  */}
                <div className="flex flex-col">
                    <label className="leading-loose">Social Media Links</label>
                    <button
                        type="button"
                        onClick={addsocialMedia}
                        className="flex items-center px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                    >
                        <FaPlus className="mr-2" /> Add Social Media Link
                    </button>
                    {socialMedia.map((social, index) => (
                        <div key={index} className="flex flex-row items-center space-x-4 mt-4">
                            <input
                                type="text"
                                value={social.name}
                                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                placeholder="Social Media Name"
                            />
                            <input
                                type="text"
                                value={social.link}
                                onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                                className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                placeholder="Social Media Link"
                            />
                            <button
                                type="button"
                                onClick={() => removesocialMedia(index)}
                                className="text-gray-400"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    ))}
                </div>
                {/* end points */}
                <button type="submit" className="button-submit" disabled={loading}>Sign Up</button>
                <p className="p">
                    <button disabled={loading}>
                        Already a comptechian! <Link to={"/login"} className="span">Sign in</Link>
                    </button>
                </p>
            </form>
        </div>
    );
}

export default Register;
