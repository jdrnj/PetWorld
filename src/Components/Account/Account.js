import React from "react";

const Account = () => {
  return (
    <div>
        <label htmlFor="username">Username:</label>
      <input type="text" name="username" placeholder="Your username" />
      <label htmlFor="username">Email:</label>
      <input type="text" name="email" placeholder="Your email" />
      <label htmlFor="username">Password:</label>
      <input type="text" name="password" placeholder="Your password" />
      <button>Edit</button>
    </div>
  );
};

export default Account;
