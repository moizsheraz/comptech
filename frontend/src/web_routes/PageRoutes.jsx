import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

// pages
import Home from '../pages/Home';
import Cabinet from '../pages/Cabinets';
import Error404 from '../components/Error404';
import Events from '../pages/Events';
import ProfilePage from '../pages/ProfilePage';
import EventsPage from '../pages/EventsPage';
// admin routes 
import AddEvents from '../pages/AddEvents';
import AddTeams from '../pages/AddTeams';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Teams from '../pages/Teams';

const RedirectToHome = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate('/');
    }, []);

    return null;
};
const PageRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/home' element={<RedirectToHome />} />
            <Route exact path='/cabinet' element={<Cabinet />} />
            <Route exact path='/profile/:name' element={<ProfilePage />} />
            <Route exact path='/events/:id' element={<EventsPage />} />
            <Route exact path='/teams/:name' element={<Teams />} />
            <Route exact path='/events' element={<Events />} />
            <Route exact path='/admin/addevent' element={<AddEvents />} />
            <Route exact path='/admin/addteam' element={<AddTeams />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
            <Route path='*' element={<Error404 />} />
        </Routes>
    )
}

export default PageRoutes;
