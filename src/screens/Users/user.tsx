import { useParams } from "react-router-dom";
import { users } from "../../db";

function User() {
  const { userId } = useParams();
  const user = users.find((user) => user.id === Number(userId))!;
  return (
    <h1>
      User {userId}: {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
    </h1>
  );
}

export default User;
