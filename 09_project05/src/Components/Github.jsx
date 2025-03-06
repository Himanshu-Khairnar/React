import React, { useEffect, useState } from "react";

export default function Github() {
  const [data, setData] = useState({});
  useEffect(() => {
    fetch("https://api.github.com/users/Himanshu-Khairnar")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
  return (
    <div>
      <h1> github Follower:{data.followers}</h1>
      <p>Name:{data.login}</p>
      <img src={data.avatar_url} alt="" srcset="" />
    </div>
  );
}
