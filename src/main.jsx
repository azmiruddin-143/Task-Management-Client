import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import MainLaout from './layout/MainLaout';
import AuthProvider from './provider/AuthProvider';
import AddTask from './components/page/AddTask';
import Task from './components/page/Task';
import { QueryClientProvider } from '@tanstack/react-query';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLaout></MainLaout>,
    children: [
      {
        path: "/",
        element: <Task></Task>
      },
      {
        path: "/addtask",
        element: <AddTask></AddTask>
      }
    ]
  },
]);

import { QueryClient } from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
</AuthProvider>
)
