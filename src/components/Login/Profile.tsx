import { useAuth0 } from '@auth0/auth0-react';
import HoverProfile from './HoverProfile';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <>
            {isAuthenticated && (
                <HoverProfile isAuthenticated={isAuthenticated} user={user} />
            )}
        </>
    );
};

export default Profile;
