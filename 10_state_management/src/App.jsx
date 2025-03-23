import React from "react";
import UserContextProvider from "./Context/UserContextProvider";
import Login from "./Components/Login";
import Profile from "./Components/Profile";

export default function App() {
  return (
    <UserContextProvider>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">Welcome</h1>
        <Login />
        <Profile />
      </div>
    </UserContextProvider>
  );
}
  