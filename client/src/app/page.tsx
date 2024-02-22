"use client"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { useEffect, useState } from "react";
import LandingPage from "./pages/landingPage/LandingPage";

export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  useEffect(() => {
    // TODO: add a req to check validate token
    const token = localStorage.getItem("token")
    if (token) setIsOpen(false)
    else setIsOpen(true)
  }, [])

  return (
    <main className="min-h-screen flex-col bg-bg-root">
      <LandingPage />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </main>
  );
}
