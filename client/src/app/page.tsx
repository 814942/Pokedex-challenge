"use client"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import HomePage from "./home/page";
import { useEffect, useState } from "react";
import Modal from "@/components/molecules/Modal/Modal";

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
      {isOpen ?
        <Modal
          setIsOpen={setIsOpen}
        />
        : <HomePage />
      }
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
