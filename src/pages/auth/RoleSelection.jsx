import { Link } from "react-router-dom";

const RoleSelection = () => {
  return (
    <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          Blood Donation System
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Choose how you would like to register
        </p>

        <div className="grid md:grid-cols-2 gap-6">

          <Link
            to="/signup/donor"
            className="border rounded-xl p-8 hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4 text-center">
            </div>

            <h2 className="text-xl font-semibold text-center">
              Donor Registration
            </h2>

            <p className="text-gray-500 text-center mt-2">
              Register as a blood donor
            </p>
          </Link>

          <Link
            to="/signup/hospital"
            className="border rounded-xl p-8 hover:shadow-lg transition"
          >
            <div className="text-5xl mb-4 text-center">
            </div>

            <h2 className="text-xl font-semibold text-center">
              Hospital Registration
            </h2>

            <p className="text-gray-500 text-center mt-2">
              Register your hospital
            </p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default RoleSelection;