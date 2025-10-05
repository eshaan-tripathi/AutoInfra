// src/pages/Auth.jsx
import { useState, useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Auth() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();


  // Watch for login state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

// Example Google login
const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result.user);
  } catch (err) {
    console.error(err);
  } finally{
    navigate('/');
  }
};


  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout Error:", error);
    }finally{
    navigate('/');
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
        />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Welcome to AutoInfra</h2>

        {!user ? (
          // Login button if no user
          <button
            onClick={handleGoogleLogin}
            className="cursor-pointer w-full flex items-center justify-center gap-3 rounded-lg bg-white text-gray-800 font-medium px-4 py-3 hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5 "
            />
            Continue with Google
          </button>
        ) : (
          // User avatar + dropdown
          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-white overflow-hidden"
            >
              <img
                src={user.photoURL}
                alt="User"
                className="w-full h-full object-cover"
              />
            </button>

            {dropdownOpen && (
              <div className=" cursor-pointer absolute right-0 mt-3 w-40 bg-gray-800 border border-gray-700 rounded-xl shadow-lg py-2">
                <p className="px-4 py-2 text-gray-300 text-sm truncate">
                  {user.displayName}
                </p>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 rounded-b-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
