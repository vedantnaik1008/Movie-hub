import { User } from "@auth0/auth0-react";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

type Props = {
    isAuthenticated: boolean;
    user: User | undefined;
}

const HoverProfile = ({ user } : Props) => {
    const [isClicked, setIsClicked] = useState(false)

  return (
    <div onClick={() => setIsClicked(prev => !prev)}>
       <div className="Profile-image">
        <img src={user?.picture} alt={user?.name} />
        {isClicked ? <LogoutButton /> : null}
      </div>
    </div>
  )
}

export default HoverProfile
