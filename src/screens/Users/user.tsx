import { Link, Outlet, useParams } from "react-router-dom";
import { users } from "../../db";
import { capitalizeFirstLetter } from "../../utils";

function User() {
  const { userId } = useParams();
  const user = users.find((user) => user.id === Number(userId))!;
  return (
    <div>
      <h1>
        User {userId}: {capitalizeFirstLetter(user.name)}
      </h1>
      <hr />
      <Link to={`followers`}>See Followers</Link>
      <Outlet context={{ userData: user }} />
    </div>
  );
}

export default User;
