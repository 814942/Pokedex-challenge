import React from "react";

import Link from "next/link";

export default function BackToHome() {
  return (
    <div className="flex justify-end">
      <Link className="p-2 m-4 border-2 border-solid rounded-2xl border-cs-gray-100 shadow-2xl hover:translate-y-px bg-secondary text-cs-white" href="/home">
        Volver al inicio
      </Link>
    </div>
  );
}
