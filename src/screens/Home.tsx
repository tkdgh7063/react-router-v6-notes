import { Link } from "react-router-dom";
import { users } from "../db";
import { capitalizeFirstLetter } from "../utils";

function Home() {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ fontSize: "18px" }}>
            <Link to={`/users/${user.id}`}>
              {capitalizeFirstLetter(user.name)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
