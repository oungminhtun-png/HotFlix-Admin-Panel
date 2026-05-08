import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import AuthGuard from 'components/AuthGuard'; // import လုပ်ထားပြီးသား
import UsersList from '../pages/users/view/UsersList';
import Users_create from '../pages/users/entry/Users_create';
import UsersDetail from '../pages/users/view/UsersDetail';
import Users_update from '../pages/users/entry/Users_update';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));




// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  // အဓိက layout ကို AuthGuard နဲ့ အုပ်လိုက်ပါမယ်
  element: (
    <AuthGuard>
      <DashboardLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    //Users Route
    { path: 'users/list', element: <UsersList />},
    { path: 'users/create', element: <Users_create />},
    { path: 'users/:id', element: <UsersDetail />},
    { path: 'users/update/:id', element: <Users_update />}

    
  ]
};

export default MainRoutes;