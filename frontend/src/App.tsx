import { useState } from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'signup' | 'signin' | 'dashboard'>('signup');

  const renderPage = () => {
    switch (currentPage) {
      case 'signin':
        return <SignIn onLogin={() => setCurrentPage('dashboard')} onNavigate={setCurrentPage} />;
      case 'dashboard':
        return <Dashboard onLogout={() => setCurrentPage('signin')} />;
      default:
        return <SignUp onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
