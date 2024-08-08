import { Link } from "react-router-dom";


function Login() {
    return ( <>
    
    <div className="bg-gray-100 flex justify-center items-center h-screen">
  {/* Left: Image */}
  <div className="w-1/2 h-screen hidden lg:block">
    <img
      src="https://pressbooks.pub/app/uploads/sites/4507/2016/07/cover-scaled-1.jpg"
      alt="comptech Image"
      className="object-cover w-full h-full"
    />
  </div>
  <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
    <h1 className="text-2xl font-semibold mb-4">Login</h1>
    <form className="space-y-4">
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-600">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autoComplete="off"
        />
      </div>
      {/* Password Input */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autoComplete="off"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Login
      </button>
    </form>
    <div className="mt-6 text-blue-500 text-center">
      <Link to="/register" className="hover:underline">
        Sign up Here
      </Link>
    </div>
  </div>
</div>



    </> );
}

export default Login;