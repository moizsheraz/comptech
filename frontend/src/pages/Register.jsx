import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { HiOutlineMail } from "react-icons/hi";
import {
  MdOutlinePermIdentity,
  MdOutlineSupervisorAccount,
} from "react-icons/md";
import { PiPasswordDuotone } from "react-icons/pi";
import { RiLockPasswordFill } from "react-icons/ri";
import { SiOpensourcehardware } from "react-icons/si";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Register.css";

const Register = () => {
  const [Isloading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [session, setSession] = useState(0);
  const [department, setDepartment] = useState("");
  const [about, setAbout] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }
    const toastId = toast.loading("Signing up...");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("session", session);
    formData.append("department", department);
    formData.append("password", password);
    formData.append("about", about);

    const configOption = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/user/register",
        formData,
        configOption
      );
      toast.success(data.message, {
        id: toastId,
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
      setAvatar(null);
      setSession(0);
      setDepartment("");
      setAbout("");
    }
    // registerUser("Registering...", {
    //     email,
    //     password,
    //     name,
    //     session,
    //     department,
    //     about,
    //     avatar
    // });
  };

  return (
    <>
      <div className="login_signup_container bg-slate-200 ">
        <form className="form" method="post" onSubmit={submitHandler}>
          <h1 className="text-2xl font-bold text-slate-800 text-left flex gap-4 items-center">
            Create an account{" "}
          </h1>
          <div className="flex-column">
            <label>Name</label>
          </div>
          <div className="inputForm">
            <MdOutlinePermIdentity />
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="input"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="flex-column">
            <label>Email </label>
          </div>
          <div className="inputForm">
            <HiOutlineMail />
            <input
              type="text"
              autoComplete={"true"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="input"
              placeholder="22-CS-49@students.uettaxila.edu.pk"
              required
            />
          </div>
          <div className="flex-column">
            <label>Session </label>
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
            <label>Department </label>
          </div>
          <div className="inputForm">
            <SiOpensourcehardware />
            <select
              required={true}
              name="session"
              id="session"
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
            <label>Password </label>
          </div>
          <div className="inputForm">
            <RiLockPasswordFill />
            <input
              type={`${passwordShown ? "text" : "password"}`}
              className="input"
              value={password}
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter a strong password"
            />
            {passwordShown ? (
              <AiFillEyeInvisible
                className="cursor-pointer"
                onClick={() => {
                  setPasswordShown(false);
                }}
              />
            ) : (
              <AiFillEye
                className="cursor-pointer"
                onClick={() => {
                  setPasswordShown(true);
                }}
              />
            )}
          </div>
          <div className="flex-column">
            <label>Confirm Password </label>
          </div>
          <div className="inputForm">
            <PiPasswordDuotone />
            <input
              type={`${passwordShown ? "text" : "password"}`}
              className="input"
              value={confirmpassword}
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="Confirm your password"
            />
          </div>
          <div className="flex-column flex">
            <label>About</label>
            <label className="text-xs"></label>
          </div>
          <div className="inputForm focus:border focus:border-slate-400 ">
            <textarea
              className="input w-[90%]"
              value={about}
              required
              onChange={(e) => {
                setAbout(e.target.value);
              }}
              placeholder="Give some good professional details about youself to be displayed in your profile"
            />
          </div>
          <div className="relative">
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              className="invisible"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file.size > 1024 * 1024 * 10) {
                  toast.error("File size should be less than 10MB");
                  return;
                }
                let reader = new FileReader();
                reader.onload = () => {
                  if (reader.readyState === 2) {
                    setAvatar(reader.result);
                  }
                };
                reader.readAsDataURL(file);
              }}
            />
            <label htmlFor="fileInput" className="cursor-pointer">
              <div className="flex items-center">
                {avatar ? (
                  <img
                    src={avatar}
                    className="h-16 w-16 rounded-full object-cover object-top border-2 p-1 border-slate-800"
                    alt=""
                  />
                ) : (
                  <div className="p-2 bg-blue-500 text-white rounded-full">
                    <FcAddImage className="h-6 w-6" />
                  </div>
                )}
                <div className="ml-2 text-slate-900">Upload Image</div>
              </div>
            </label>
          </div>
          <button className="button-submit" disabled={Isloading}>
            Sign Up
          </button>
          <p className="p">
            Already a comptechian!{" "}
            <button disabled={Isloading}>
              <Link to={"/login"} className="span">
                Sign in
              </Link>
            </button>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
