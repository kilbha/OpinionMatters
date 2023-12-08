'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { create_user } from './services';
export default function signup() {
  return (
    <div className={`${styles.bgBackgroundImage} bg-cover bg-center h-screen `}>
      <div className="min-h-screen flex items-center justify-left bg-gray-30 text-white-900">
        <div className="bg-gray-0 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-3xl font-semibold mb-6 text-white-900">
            Sign Up -- ADded some dadta
          </h2>

          <div className="mb-4">
            <label className="block text-white-900 text-xl">Email</label>
            <input
              type="email"
              className="text-black w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white-900 text-xl">Password</label>
            <input
              type="password"
              className="text-black w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={create_user}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
