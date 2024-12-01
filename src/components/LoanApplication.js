import { useState } from 'react';
import { useRouter } from 'next/router';
import { createLoanRequest } from '../pages/api/loan';


const LoanRequestForm = () => {
  const [loanData, setLoanData] = useState({
    loanAmount: '',
    loanDuration: '',
    loanInterest: '',
    returnType: 'money',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanData({
      ...loanData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        loanData.farmerId = localStorage.getItem('_id');
        const response = await createLoanRequest(loanData);
      if (response.status === 201) {
        router.push('/allRequests');  // Navigate to the loan requests page
      }
    } catch (error) {
      setError('Error creating loan request, please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Create Loan Request</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Loan Amount */}
        <div className="flex flex-col">
          <label htmlFor="loanAmount" className="text-lg font-semibold mb-2">Loan Amount</label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={loanData.loanAmount}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Loan Duration */}
        <div className="flex flex-col">
          <label htmlFor="loanDuration" className="text-lg font-semibold mb-2">Loan Duration (Months)</label>
          <input
            type="number"
            id="loanDuration"
            name="loanDuration"
            value={loanData.loanDuration}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Loan Interest */}
        <div className="flex flex-col">
          <label htmlFor="loanInterest" className="text-lg font-semibold mb-2">Loan Interest (%)</label>
          <input
            type="number"
            id="loanInterest"
            name="loanInterest"
            value={loanData.loanInterest}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Return Type */}
        <div className="flex flex-col">
          <label htmlFor="returnType" className="text-lg font-semibold mb-2">Return Type</label>
          <select
            id="returnType"
            name="returnType"
            value={loanData.returnType}
            onChange={handleChange}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="money">Money</option>
            <option value="crop">Crop</option>
          </select>
        </div>
        {/* Error Message */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default LoanRequestForm;
