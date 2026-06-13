const HospitalSignup = () => {
  return (
    <div className="min-h-screen bg-red-50 flex justify-center items-center p-4">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Hospital Registration
        </h2>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="Hospital Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="License Number"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Contact Person"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded-lg"
          />

          <button
            className="w-full bg-red-600 text-white p-3 rounded-lg"
          >
            Register Hospital
          </button>

        </form>
      </div>
    </div>
  );
};

export default HospitalSignup;