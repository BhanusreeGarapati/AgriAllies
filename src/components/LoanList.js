import { useEffect, useState } from 'react';
import { getAllLoanRequests, updateLoanRequest } from '../pages/api/loan'; 
import { useRouter } from 'next/router';

const LoanListPage = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserType = localStorage.getItem('userType');
      const id = localStorage.getItem('_id');
      setUserType(storedUserType);
      setUserId(id);
      fetchLoans(storedUserType, id);
    }
  }, []);

  const fetchLoans = async (type, id) => {
    try {
      const response = await getAllLoanRequests(type, id);
      setLoans(response);
      setLoading(false);
    } catch (error) {
      setError('Error fetching loan data');
      setLoading(false);
    }
  };

  const handleLoanUpdate = async (loanId, status) => {
    try {
      const response = await updateLoanRequest(loanId, { investorId: userId, status });
      setLoans(loans.map(loan => loan._id === loanId ? { ...loan, status: response.status } : loan));
      router.push('/loanData');
    } catch (error) {
      setError('Error updating loan request');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6">Loan Requests</h1>
      {loans.length === 0 ? (
        <div className="text-center text-lg text-gray-600">No data available</div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Farmer</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Investor</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Loan Amount</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Duration (Months)</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Interest (%)</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Return Type</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Created At</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id} className="border-b">
                <td className="px-4 py-2 text-sm">{loan.farmerId?.name}</td>
                <td className="px-4 py-2 text-sm">{loan.investorId?.name || '-'}</td>
                <td className="px-4 py-2 text-sm">{loan.loanAmount}</td>
                <td className="px-4 py-2 text-sm">{loan.loanDuration}</td>
                <td className="px-4 py-2 text-sm">{loan.loanInterest}</td>
                <td className="px-4 py-2 text-sm">{loan.returnType}</td>
                <td className="px-4 py-2 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      loan.status === 'pending'
                        ? 'bg-yellow-500'
                        : loan.status === 'approved'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm">
                  {new Date(loan.createdAt).toLocaleDateString()} {new Date(loan.createdAt).toLocaleTimeString()}
                </td>
                <td className="px-4 py-2 text-sm">
                  {(userType === 'investor' || userType === 'ngo') && loan.status === 'pending' && (
                    <button
                      onClick={() => handleLoanUpdate(loan._id, 'approved')}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Give Loan
                    </button>
                  )}
                  {userType === 'farmer' && loan.status === 'pending' && (
                    <button
                      onClick={() => handleLoanUpdate(loan._id, 'deleted')}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Delete Request
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LoanListPage;
