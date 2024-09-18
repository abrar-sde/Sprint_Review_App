import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPlusCircle, FaSave, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [canCreateMeeting, setCanCreateMeeting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSprintReview, setShowSprintReview] = useState(false);
  const [sprintName, setSprintName] = useState('');
  const [Today, setDate] = useState('');
  const [timer, setTimer] = useState(120); // 2 minute in seconds
  const [timerEnded, setTimerEnded] = useState(false);
  const [goodPoints, setGoodPoints] = useState('');
  const [betterPoints, setBetterPoints] = useState('');
  const [pastReviews, setPastReviews] = useState([]);
  const [activeReview, setActiveReview] = useState(null);
  const [activeSprint, setActiveSprint] = useState(null); // New state for active sprint
  const timerRef = useRef(null);
  const navigate = useNavigate();

  // Polling interval ref
  const pollingRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data.message);
        setCanCreateMeeting(response.data.can_create_meeting);

        // Fetch past sprint reviews
        const sprintReviewsResponse = await axios.get('http://localhost:3000/sprint_reviews', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPastReviews(sprintReviewsResponse.data);
      } catch (error) {
        setMessage('Unauthorized');
        navigate('/login');
      }
    };

    fetchData();

    // Start polling for active sprint reviews
    startPolling();

  }, [navigate]);

  const startPolling = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/active_sprint', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response);
      if (response.data && response.data.id) {
        setActiveSprint(response.data.active_sprint);
        setShowSprintReview(true);
        setSprintName(response.data.sprint_name);
        setDate(response.data.sprint_date);
        console.log(response);

        const endTime = new Date(response.data.end_time);

      // Get the current time
      const currentTime = new Date();

      // Calculate the remaining time in milliseconds
      const remainingTime = endTime - currentTime;

      if (remainingTime > 0) {
        // Convert milliseconds to seconds
        const remainingSeconds = Math.floor(remainingTime / 1000);
        // console.log(remainingSeconds);
        // Set timer state in seconds
        setTimer(remainingSeconds);
        startTimer();
      } else {
        // Timer has ended
        console.log("time ended");
        setTimer(0);
        setTimerEnded(true);
      }

      } else {
        setActiveSprint(null);
      }
    } catch (error) {
      console.error('Error polling for active sprint:', error);
    }
  };

  const  setActiveDetails = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:3000/active_sprint', 
      {
        active_sprint: {
          sprint_name: sprintName,
          sprint_date: Today,
        },
      },{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleCreateMeetingClick = () => {
    // setActiveDetails();
    setShowForm(true);
  };

  const handleStartClick = () => {
    setActiveDetails();
    setShowForm(false);
    setShowSprintReview(true);
    startTimer();
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          setTimerEnded(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
  
      // Call API to either update or create sprint review
      const response = await axios.post('http://localhost:3000/sprint_reviews/update_or_create', {
        sprint_review: {
          sprint_name: sprintName,
          sprint_date: Today,
          good_points: goodPoints,   // New points to be appended
          better_points: betterPoints,  // New points to be appended
        },
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response) {
        console.log("saved");
        const sprintReviewsResponse = await axios.get('http://localhost:3000/sprint_reviews', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPastReviews(sprintReviewsResponse.data);
        handleCloseClick(); // Close the form and reset the state
      }
    } catch (error) {
      console.log("failed");
    }
  };
  

  const handleCloseClick = () => {
    clearInterval(timerRef.current);
    setShowForm(false);
    setShowSprintReview(false);
    setSprintName('');
    setDate('');
    setTimer(120);
    setTimerEnded(false);
    setGoodPoints('');
    setBetterPoints('');
  };

  const handleReviewClick = (review) => {
    setActiveReview(review);
  };

  const handleReviewCloseClick = () => {
    setActiveReview(null);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <nav className="relative flex justify-between items-center p-6 bg-white shadow-md h-20">
  <div className="flex items-center">
    <img src="https://tse3.mm.bing.net/th?id=OIP.jKJnao0UfP1r3YQNFLZ_-QHaEK&pid=Api&P=0&h=180" alt="Logo" className="h-20 w-30 mr-4" />
  </div>
  <div className="absolute left-1/2 transform -translate-x-1/2">
    <h1 className="text-3xl font-bold text-gray-700">SPRINT REVIEW & RETRO</h1>
  </div>
  <div className="flex items-center">
    {canCreateMeeting && !showSprintReview && (
      <button
        onClick={handleCreateMeetingClick}
        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 mr-4"
      >
        <FaPlusCircle className="mr-2 text-2xl" />
        Create New Sprint
      </button>
    )}
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
    >
      Logout
    </button>
  </div>
</nav>


      {/* Main Content */}
      {/* <div className="flex flex-col justify-center items-center h-full text-center px-4">
        <h1 className="text-4xl font-extrabold mb-8">{message}</h1>
        {canCreateMeeting && !showSprintReview && (
          <p className="text-lg mb-16">Click the button above to start a new sprint meeting.</p>
        )}
      </div> */}

     {/* Past Sprint Reviews */}
<div className="p-6">
  <h2 className="text-2xl font-bold mb-4">Past Sprint Reviews</h2>
  {pastReviews.length > 0 ? (
    <div className="space-y-4">
      {pastReviews.map((review) => (
        <div
          key={review.id}
          onClick={() => handleReviewClick(review)}
          className="bg-white p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
        >
          <div className="font-bold text-lg">{review.sprint_name}</div>
          <div className="text-gray-500">{review.sprint_date}</div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600">No past sprint reviews available.</p>
  )}

  {activeReview && (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 transition-opacity duration-300">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full z-50 transform scale-95 animate-scaleIn">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
          onClick={handleReviewCloseClick}
        >
          <FaTimes className="text-2xl" />
        </button>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{activeReview.sprint_name}</h2>
          <p className="text-gray-600">{activeReview.sprint_date}</p>
        </div>
        <div className="flex gap-6">
          <div className="w-1/2">
            <h3 className="text-xl font-bold mb-2 text-gray-700">What Did We Do Well</h3>
            <div
              className="p-4 border border-gray-300 rounded-lg"
              dangerouslySetInnerHTML={{ __html: activeReview.good_points.replace(/\n/g, '<br />') }}
            />
          </div>
          <div className="w-1/2">
            <h3 className="text-xl font-bold mb-2 text-gray-700">What Should We Have Done Better</h3>
            <div
              className="p-4 border border-gray-300 rounded-lg"
              dangerouslySetInnerHTML={{ __html: activeReview.better_points.replace(/\n/g, '<br />') }}
            />
          </div>
        </div>
      </div>
    </div>
  )}
</div>


        {/* Create Meeting Form */}
        {showForm && (
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full z-50">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={handleCloseClick}
              >
                <FaTimes className="text-2xl" />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">New Sprint Meeting</h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sprintName">
                    Sprint Name
                  </label>
                  <input
                    type="text"
                    id="sprintName"
                    value={sprintName}
                    onChange={(e) => setSprintName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={Today}
                    onChange={(e) => setDate(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleStartClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 w-full"
                >
                  Start
                </button>
              </form>
            </div>
          </div>
        )}

      {/* Sprint Review Form */}
 {/* Sprint Review Form */}
{showSprintReview && (
  <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full z-50">
      {/* Close Button */}
      <button
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        onClick={handleCloseClick}
      >
        <FaTimes className="text-2xl" />
      </button>

      {/* Timer (Placed below Close Button) */}
      {!timerEnded && (
        <div className="absolute top-10 right-2 text-red-500 font-bold text-lg">
          Timer: {formatTime(timer)}
        </div>
      )}

      {/* Sprint Name and Date */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{sprintName}</h2>
        <p className="text-gray-600">{Today}</p>
      </div>

      {/* Sprint Review Text Areas */}
      <div className="flex gap-6">
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-2 text-gray-700">What Did We Do Well</h3>
          <textarea
            value={goodPoints}
            onChange={(e) => setGoodPoints(e.target.value)}
            className="p-4 w-full border border-gray-300 rounded-lg h-32"
            disabled={timerEnded}
          />
        </div>
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-2 text-gray-700">What Should We Have Done Better</h3>
          <textarea
            value={betterPoints}
            onChange={(e) => setBetterPoints(e.target.value)}
            className="p-4 w-full border border-gray-300 rounded-lg h-32"
            disabled={timerEnded}
          />
        </div>
      </div>

      {/* Save Button */}
      {(
        <button
          onClick={handleSaveClick}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 flex items-center"
        >
          <FaSave className="mr-2" /> Save
        </button>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
