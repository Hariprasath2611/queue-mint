import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import QueuePage from '@/components/pages/QueuePage';
import AppointmentsPage from '@/components/pages/AppointmentsPage';
import DashboardPage from '@/components/pages/DashboardPage';
import HelpPage from '@/components/pages/HelpPage';
import LoginPage from '@/components/pages/LoginPage';
import GenerateTokenPage from '@/components/pages/GenerateTokenPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "queue",
        element: <QueuePage />,
        routeMetadata: {
          pageIdentifier: 'queue',
        },
      },
      {
        path: "appointments",
        element: <AppointmentsPage />,
        routeMetadata: {
          pageIdentifier: 'appointments',
        },
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
        routeMetadata: {
          pageIdentifier: 'dashboard',
        },
      },
      {
        path: "help",
        element: <HelpPage />,
        routeMetadata: {
          pageIdentifier: 'help',
        },
      },
      {
        path: "login",
        element: <LoginPage />,
        routeMetadata: {
          pageIdentifier: 'login',
        },
      },
      {
        path: "generate-token",
        element: <GenerateTokenPage />,
        routeMetadata: {
          pageIdentifier: 'generate-token',
        },
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
