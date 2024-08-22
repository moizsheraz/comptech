import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
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
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState('');
    const [session, setSession] = useState("");
    const [department, setDepartment] = useState("");
    const [about, setAbout] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmpassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match',
            });
            return;
        }
        const Formdata = new FormData();
        Formdata.append('name', name);
        Formdata.append('email', email);
        Formdata.append('password', password);
        Formdata.append('session', session);
        Formdata.append('department', department);
        Formdata.append('about', about);
        Formdata.append('image', avatar);

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
                navigate('/login');
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
    const handleImageChange=(e)=>{
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setAvatarPreview(reader.result);
            setAvatar(e.target.files[0]);
          }
        };
  
        reader.readAsDataURL(e.target.files[0]);
    }

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
                    <input type="email" autoComplete={"true"} value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="22-CS-49@students.uettaxila.edu.pk" required />
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
                        onChange={(e) => setSession(e.target.value)}
                        className="px-4 py-2 w-full sm:text-sm border-gray-300 rounded-md text-gray-600"
                    >
                        <option value="#">---Select a session---</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
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
                <div className="flex-column">
                    <label>Password</label>
                </div>
                <div className="inputForm">
                    <RiLockPasswordFill />
                    <input
                        type={`${passwordShown ? "text" : "password"}`}
                        className="input"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter a strong password"
                    />
                    {
                        passwordShown ? <AiFillEyeInvisible className='cursor-pointer' onClick={() => setPasswordShown(false)} /> : <AiFillEye className='cursor-pointer' onClick={() => setPasswordShown(true)} />
                    }
                </div>
                <div className="flex-column">
                    <label>Confirm Password</label>
                </div>
                <div className="inputForm">
                    <PiPasswordDuotone />
                    <input
                        type={`${passwordShown ? "text" : "password"}`}
                        className="input"
                        value={confirmpassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                    />
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
