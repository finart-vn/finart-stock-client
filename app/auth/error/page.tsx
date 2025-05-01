"use client";

import { useEffect } from "react";

export default function AuthError() {
  useEffect(() => {
    window.parent.postMessage("auth-error", "*");
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-500">Authentication Error</h1>
        <p className="text-gray-600">Please try again or contact support if the problem persists.</p>
      </div>
    </div>
  );
} 