import { useOutletContext } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils";

interface User {
  id: number;
  name: string;
}

interface FollowersContext {
  userData: User;
}

function Followers() {
  const { userData } = useOutletContext<FollowersContext>();
  return <h1>Followers of {capitalizeFirstLetter(userData.name)}</h1>;
}

export default Followers;
