import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { history } from '../_helpers'

export { ProtectedRoute };

function ProtectedRoute({ children }) {
    const { user: authUser } = useSelector(x => x.auth);
    
    if (!authUser || !authUser.isAdmin) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: history.location }} />
    }

    // authorized so return child components
    return children;
}