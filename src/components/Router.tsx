// SSR-safe router configuration
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

const routes = [
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
];

// Initialize the router only in the browser to avoid server-side crashes during import
const router = typeof window !== 'undefined'
  ? createBrowserRouter(routes, {
    basename: import.meta.env.BASE_NAME,
  })
  : null;

export default function AppRouter() {
  if (!router) {
    return null; // Return nothing during server-side initial parse
  }

  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
