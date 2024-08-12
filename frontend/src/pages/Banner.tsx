
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CountdownCard from '../components/CountdownCard';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const Banner = () => {
  const { id } = useParams(); 
  const [endTime, setEndTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    console.log(id);
    const fetchEndTime = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/events/${id}`); 
        setEndTime(new Date(response.data.endTime).getTime());
      } catch (error) {
        console.error('Error fetching end time:', error);
      }
    };

    fetchEndTime();
  }, [id]);

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="bg-red-900 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Countdown to Event</h2>
        <div className="flex">
          <CountdownCard value={timeLeft.days} label="Days" />
          <CountdownCard value={timeLeft.hours} label="Hours" />
          <CountdownCard value={timeLeft.minutes} label="Minutes" />
          <CountdownCard value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
