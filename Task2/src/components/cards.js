import React from "react";

const Users = ({ users }) => {
  const mainstyle = {
    display: "flex"
  };
  return (
    <div id="main" style={mainstyle}>
      {users.map((user) => (
        <div className="profile" key={user.id}>
          <img src={user.avatar} alt={user.avatar} className="avatar"></img>
          <h1 className="name">
            {user.first_name} {user.last_name}
          </h1>
          <h4 className="email">{user.email}</h4>
          <h5>User ID: {user.id}</h5>
        </div>
      ))}
    </div>
  );
};

export default Users;