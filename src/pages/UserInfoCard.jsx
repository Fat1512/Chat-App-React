import { useState } from "react";
import { Bell, Phone, AtSign, Edit2 } from "lucide-react";

export default function UserInfoCard() {
  const [activeTab, setActiveTab] = useState("media");

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Header with Image */}
      <div className="relative">
        <img
          src="/path-to-your-image.png"
          alt="User Background"
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 bg-gray-800 text-white p-1 rounded-full">
          <Edit2 size={16} />
        </button>
      </div>

      {/* User Info */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">Thắm</h2>
        <p className="text-sm text-gray-500">last seen 2/5/2025</p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Phone size={16} className="text-gray-600" />
            <span className="text-gray-700">+84 359 386 414</span>
          </div>
          <div className="flex items-center space-x-2">
            <AtSign size={16} className="text-gray-600" />
            <span className="text-gray-700">@Nhatct1908</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bell size={16} className="text-gray-600" />
            <span className="text-gray-700">Notifications</span>
            <input type="checkbox" className="ml-auto toggle-checkbox" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t flex">
        {["Media", "Files", "Links", "Music", "Voice", "Groups"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 p-2 text-center text-sm font-medium border-b-2 ${
              activeTab.toLowerCase() === tab.toLowerCase()
                ? "border-blue-500 text-blue-500"
                : "border-transparent text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 text-center text-gray-500 text-sm">
        No media files yet
      </div>
    </div>
  );
}
