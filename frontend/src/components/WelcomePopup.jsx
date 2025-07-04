import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // Optional - for close icon

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasShown = sessionStorage.getItem('popupShown');
    if (!hasShown) {
      setShowPopup(true);
      sessionStorage.setItem('popupShown', 'true');
    }
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    showPopup && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="relative bg-white max-w-2xl w-full mx-4 p-6 rounded-xl shadow-lg overflow-y-auto max-h-[85vh] text-gray-800">
          
          {/* ❌ Close Icon */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
          >
            <X size={22} />
            {/* If no Lucide: <span className="text-xl">&times;</span> */}
          </button>

          <h2 className="text-2xl font-bold mb-4 text-primary">👋 Welcome to DocLink!</h2>
          <p className="mb-4">A full-stack Doctor Appointment Booking Platform 🩺💻</p>

          <h3 className="font-semibold text-lg mb-2">📝 About the Project:</h3>
          <p className="mb-4">
            DocLink is a feature-rich platform that simplifies healthcare access through real-time, clash-free appointment scheduling. It ensures secure user authentication and supports seamless online payments using Razorpay.
          </p>

          <h3 className="font-semibold text-lg mb-2">🚀 Key Features:</h3>
          <ul className="list-disc list-inside mb-4 text-sm space-y-1">
            <li>Real-time appointment booking with no scheduling conflicts</li>
            <li>Secure authentication using JWT</li>
            <li>
              Integrated Razorpay payment gateway <br />
              <span className="ml-4 text-gray-600 text-xs">(Test with Card No.: 4386 2894 0766 0153, any CVV, any future expiry date)</span>
            </li>
            <li>Fully responsive and mobile-friendly UI</li>
          </ul>

          <h3 className="font-semibold text-lg mb-2">🧑‍💻 Technology Stack:</h3>
          <ul className="list-disc list-inside mb-4 text-sm space-y-1">
            <li><strong>Frontend:</strong> React.js, Tailwind CSS</li>
            <li><strong>Backend:</strong> Node.js, Express.js</li>
            <li><strong>Database:</strong> MongoDB (Mongoose)</li>
            <li><strong>Authentication:</strong> JWT</li>
            <li><strong>Cloud Integration:</strong> Cloudinary</li>
            <li><strong>Libraries & APIs:</strong> Axios, React Router, Toastify, Razorpay</li>
          </ul>

          <h3 className="font-semibold text-lg mb-2">👥 User Roles & Functionalities:</h3>
          <ul className="list-disc list-inside text-sm mb-4 space-y-1">
            <li><strong>Patient:</strong> Register, filter doctors, book/cancel appointments, make online payments</li>
            <li><strong>Doctor:</strong> Manage/view appointments, access dashboard, edit profile</li>
            <li><strong>Admin:</strong> Track activity, add/manage doctors, manage appointments, access dashboard</li>
          </ul>

          <p className="font-medium mb-6">✨ Click <strong>OK</strong> to start exploring DocLink!</p>

          <div className="text-right">
            <button
              onClick={handleClose}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default WelcomePopup;
