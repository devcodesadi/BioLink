import React from "react";
import { MailCheck } from "lucide-react";

function EmailVerify() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
        <MailCheck className="mx-auto text-green-500 w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Verify Your Email</h2>
        <p className="text-gray-600 mb-4">
          We’ve sent a verification link to your email. Please check your inbox
          and click the link to verify your email address.
        </p>
        <p className="text-sm text-gray-500 mb-2">
          Didn’t receive the email? Check your spam or junk folder.
        </p>

        <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300">
          Resend Email
        </button>
      </div>
    </div>
  );
}

export default EmailVerify;
