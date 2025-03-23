import React, { useContext } from "react";
import UserContext from "../Context/UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);

  if (!user) return <div className="text-center text-white">Please Login</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <h4 className="text-lg font-medium mb-2">Username: {user.username}</h4>
        <h4 className="text-lg font-medium">Password: {user.password}</h4>
      </div>
    </div>
  );
}
