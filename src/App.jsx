import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    console.log(name, email);
    const user = { name, email };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("post data login", data);

        const newUser = [...users, data];
        setUsers(newUser);
        form.reset();
      });
  };
  return (
    <div>
      <h1>User From Database Server.{users.length}</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' name='name' id='' />
        <br />
        <input type='email' name='email' id='' />
        <br />
        <input type='submit' value='submit' />
      </form>
      {users.map((user) => (
        <li key={user.id}>
          {user.id}: {user.name}: {user.email}
        </li>
      ))}
    </div>
  );
}

export default App;
