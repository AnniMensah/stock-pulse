import React from 'react';

const SignUp: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 text-center">
      <div className="text-5xl mb-4">👤</div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Portal</h2>
      <p className="text-gray-500">Sign in to sync your inventory across multiple devices.</p>
      <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors">Get Started</button>
    </div>
  );
};

export default SignUp;