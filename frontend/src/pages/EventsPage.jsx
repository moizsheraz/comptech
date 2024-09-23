import { useParams } from 'react-router-dom';
import TimeLineOne from '../components/TimeLineOne';

// data 
import Events from '../Data/EventData.js'; // data for Event



// swiper imports 

// swiper js import
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import { useEffect, useState } from 'react';
import axios from 'axios';


const EventsPage = () => {
    let { id } = useParams();
    
    const [event, setevent] = useState([]);

    const fetchEvents = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/event/single/${id}`);
            setevent(response.data);
        } catch (err) {
            console.error('Error fetching events:', err);
        }
    };

    useEffect(()=> {
        fetchEvents(id);
    }, []);
    console.log(event);
    
    return (
        <div className="h-full bg-gray-200 p-8">
            <div className="bg-white rounded-lg shadow-xl pb-8">
                <div className="w-full h-[250px] -translate-y-1">
                    <img src={event?.data?.eventCover?.url} className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover object-top outline-none" />
                </div>
                <div className="flex flex-col items-center -mt-20 select-none">
                    <img
                        src={event?.data?.spokesPerson?.image?.url}
                        className="w-40 border-4 border-white rounded-full z-10"
                    />
                    <div className="flex items-center space-x-2 mt-2">
                        <p className="text-2xl select-all">{event?.data?.spokesPerson?.name}</p>
                    </div>
                    {/* <p className="text-gray-700">{event?.currentPost}</p> */}
                    <p className="text-sm text-gray-500">{event?.data?.spokesPerson?.description}</p>
                </div>
            </div>

            {/* about block  */}
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                <h4 className="text-xl text-gray-900 font-bold">About {event?.data?.title}</h4>
                <p className="mt-2 text-gray-700 select-all">
                    {event?.data?.description}
                </p>
            </div>

            {/* event points block  */}
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                <h4 className="text-xl text-gray-900 font-bold">Event Points</h4>
                <div className="relative px-4">
                    <div className="absolute h-full border border-dashed border-opacity-20 border-secondary" />
                    {/* start::Timeline item */}
                    {
                        event?.data?.keyPoints?.map((point) => {
                            return <TimeLineOne key={point.id} team={point.name} stage={point.explanation} />
                        })
                    }
                </div>
            </div>

            {/* about event  */}
            <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
                <h4 className="text-xl text-gray-900 font-bold">About {event?.data?.title}</h4>
                <p className="mt-2 text-gray-700 select-all">
                    {event?.data?.description}
                </p>
            </div>



            {
                event?.data?.eventPics && event?.data?.eventPics?.length > 0 ? <div className="flex flex-col bg-white rounded-lg shadow-xl mt-4 p-8  overflow-hidden">
                    <h4 className="text-xl text-gray-900 font-bold pb-2">Event Moments</h4>

                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        breakpoints={{
                            415: { // iPhone XR breakpoint
                                slidesPerView: 1,
                            },
                            640: {
                                slidesPerView: 2,
                            },
                            768: {
                                slidesPerView: 4,
                            },
                            1024: {
                                slidesPerView: 6,
                            },
                        }}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        className='w-[44vw] md:w-[86vw] flex items-center justify-center m-auto'
                    >
                        {
                            event?.data?.eventPics?.map((data, index) => {
                                return (
                                    <SwiperSlide key={index} className='w-fit md:w-full rounded-md cursor-pointer shadow-2xl flex items-center justify-center'>

                                        <img src={data} className="w-[200px] sm:w-full rounded-md object-contain" />

                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>

                </div> : null
            }

        </div >
    );
};

export default EventsPage;