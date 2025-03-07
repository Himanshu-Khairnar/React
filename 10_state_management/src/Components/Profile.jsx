import React, { useContext } from "react";
import UserContext from "../Context/UserContext";

export default function Profile() {
  const { user } = useContext(UserContext);
  if (!user) return <div>Please Login in</div>;
console.log(user);

  return (
    <div>
      <h2>Profile</h2>
      <h4>{user.username}</h4>
      <h4>{user.password}</h4>
    </div>
  );
}
