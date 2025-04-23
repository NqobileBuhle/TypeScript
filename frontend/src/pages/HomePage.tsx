
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-4">Welcome to the Home Page!</h2>
        <p className="text-lg mb-6">You are successfully logged in.</p>
        <Link
          to="/login"
          className="w-full bg-blue-500 text-white p-2 rounded block text-center"
        >
          Log out
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
