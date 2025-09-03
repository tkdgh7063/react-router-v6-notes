import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../../db";

function User() {
  const { userId } = useParams();
  const user = users.find((user) => user.id === Number(userId))!;
  return (
    <div>
      <h1>
        User {userId}: {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
      </h1>
      <hr />
      <Link to={`followers`}>See Followers</Link>
      <Outlet />
    </div>
  );
}

export default User;
