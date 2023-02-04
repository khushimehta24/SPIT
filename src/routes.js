import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import BarcodePage from './pages/BarcodePage';
import CSVUploadPage from './pages/CSVUploadPage';
import Kanban from "./pages/Kanban"
import LabTabs from './sections/@dashboard/tabs/Tabs';
import Landingpage from './pages/Landingpage';
import Ex1 from './pages/Detect/Ex1';
import Ex2 from './pages/Detect/Ex2';
import Ex3 from './pages/Detect/Ex3';
import CandC from './pages/Detect/C&C';
import P2P from './pages/Detect/P2P';
import MalwareController from './pages/Detect/MalwareController';
import Botnet from './pages/Detect/Botnet';
import InfectedHost from './pages/Detect/InfectedHost';
import LateralBrute from './pages/Detect/LateralBrute';
import LateralSpy from './pages/Detect/LateralSpy';


export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <Landingpage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'news', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'scanbarcode', element: <LabTabs /> },
        { path: 'schedule', element: <Kanban /> },
        // {path : ''}
      ],
    },
    {
      path: '/detection',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'exfiltration1', element: <Ex1 /> },
        { path: 'exfiltration2', element: <Ex2 /> },
        { path: 'exfiltration3', element: <Ex3 /> },
        { path: 'C&C', element: <CandC /> },
        { path: 'P2P', element: <P2P /> },
        { path: 'malwarecontol', element: <MalwareController /> },
        { path: 'botnet', element: <Botnet /> },
        { path: 'infectedhost', element: <InfectedHost /> },
        { path: 'lateralbrute', element: <LateralBrute /> },
        { path: 'lateralspy', element: <LateralSpy /> },
        { path: 'user', element: <UserPage /> },
        { path: 'news', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'scanbarcode', element: <LabTabs /> },
        { path: 'schedule', element: <Kanban /> },
        // {path : ''}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignUpPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
