// src/pages/Profile.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Briefcase, Users, ShieldCheck, ArrowLeft, QrCode } from 'lucide-react';

// --- USER DATA ---
const userData = {
  name: "KANGULKAR NARENDRA",
  rollno: "23951A055T",
  branch: "CSE",
  batch: "SKILLBRIDGE BATCH-1",
  email: "23951a055t@iare.ac.in",
  // Re-added for the QR code feature, as it's highly relevant for a profile
  qrLink: "https://raw.githubusercontent.com/Immnitin/FINAL-QTRACK/main/IVSEM_PAT_QRS/SKILLBRIDGE_BATCH-1/23951A055T.png"
};

// --- HELPER COMPONENT for displaying profile details ---
const ProfileDetail = ({ icon, label, value }) => {
  const IconComponent = icon;
  return (
    <div className="flex items-start p-4 bg-slate-50/70 rounded-xl hover:bg-slate-100 transition-colors duration-300">
      <div className="p-2 bg-blue-100 rounded-lg mr-4">
        <IconComponent className="w-6 h-6 text-blue-600 flex-shrink-0" />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500">{label}</p>
        <p className="text-md font-medium text-gray-800 break-words">{value}</p>
      </div>
    </div>
  );
};

// --- MAIN PROFILE PAGE COMPONENT ---
// Note: React component names should be in PascalCase (e.g., UserProfile)
const UserProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden relative">
        
        {/* --- Back to Dashboard Link --- */}
        <Link 
          to="/" 
          className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-full hover:bg-white transition-all shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>
        
        {/* --- Profile Header with Banner and Avatar --- */}
        <div className="relative">
          <div className="w-full h-48 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="absolute top-24 left-1/2 -translate-x-1/2">
            <div className="w-36 h-36 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-1.5 shadow-lg">
                <img
                  src={`https://ui-avatars.com/api/?name=${userData.name.replace(' ', '+')}&background=e0e7ff&color=3730a3&size=128&font-size=0.33&bold=true`}
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
            </div>
          </div>
        </div>

        {/* --- User Info Section --- */}
        <div className="pt-20 pb-8 px-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{userData.name}</h1>
          <p className="text-lg text-gray-500 font-mono mt-1 bg-slate-100 inline-block px-3 py-1 rounded-md">{userData.rollno}</p>
        </div>

        {/* --- Detailed Information Section --- */}
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Academic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileDetail icon={Mail} label="Email Address" value={userData.email} />
            <ProfileDetail icon={Briefcase} label="Branch" value={userData.branch} />
            <ProfileDetail icon={Users} label="Batch" value={userData.batch} />
            <ProfileDetail icon={ShieldCheck} label="Status" value="Active Student" />
          </div>
        </div>
        
        {/* --- QR Code Section --- */}
        <div className="p-6 border-t border-gray-200 bg-slate-50/70">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2"><QrCode /> Student QR Code</h2>
            <div className="flex justify-center">
                {userData.qrLink ? (
                    <img src={userData.qrLink} alt="Student QR Code" className="w-48 h-48 p-2 border-4 border-white rounded-lg shadow-md bg-white"/>
                ) : (
                    <div className="w-48 h-48 flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
                        QR Not Available
                    </div>
                )}
            </div>
            <p className="text-center text-sm text-gray-500 mt-3">Scan for quick identification</p>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;