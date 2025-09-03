import { Link } from "react-router-dom";
import { users } from "../db";

function Home() {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ fontSize: "18px" }}>
            <Link to={`/users/${user.id}`}>
              {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
