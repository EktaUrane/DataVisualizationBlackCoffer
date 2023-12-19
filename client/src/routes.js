import { Navigate, useRoutes } from 'react-router-dom';
import { DashboardLayout } from './layouts';
import DashboardPage from './pages/DashboardPage';
const Router = () => {

    const routes = useRoutes([
        {
            path: '/',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/" />, index: true },
                { path: "/", element: <DashboardPage /> }

            ],

        },

    ]);

    return routes;
}

export default Router;