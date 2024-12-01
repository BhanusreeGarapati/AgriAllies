import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [userType, setUserType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserType = localStorage.getItem('userType');
      setUserType(storedUserType);
    }
  }, []);

  const handleLogout = () => {
    router.push('/');
    localStorage.clear();
  };

  return (
    <nav className="bg-gray-700 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">Agri Loan</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          {userType === 'farmer' && (
            <Link href="/requestMoney" className="text-white hover:text-gray-400">
              Request Money
            </Link>
          )}
          <Link href="/allRequests" className="text-white hover:text-gray-400">
            {userType === 'farmer' ? "Pending Loans" : "Loan Requests"}
          </Link>
          <Link href="/loanData" className="text-white hover:text-gray-400">
            {userType === 'farmer' ? "Active Loans" : "Active Requests"}
          </Link>
          <button onClick={handleLogout} className="text-white hover:text-gray-400">
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none" aria-label="Open Menu">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hidden on larger screens) */}
      <div className="md:hidden mt-4 space-y-4">
        <Link href="/allRequests" className="block text-white hover:text-gray-400">
          All Requests
        </Link>
        <Link href="/requestMoney" className="block text-white hover:text-gray-400">
          Request Money
        </Link>
        <Link href="/allRequests" className="block text-white hover:text-gray-400">
          {userType === 'farmer' ? "Pending Loans" : "Loan Requests"}
        </Link>
        <Link href="/loanData" className="block text-white hover:text-gray-400">
          {userType === 'farmer' ? "Active Loans" : "Active Requests"}
        </Link>
        <button onClick={handleLogout} className="block text-white hover:text-gray-400">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
