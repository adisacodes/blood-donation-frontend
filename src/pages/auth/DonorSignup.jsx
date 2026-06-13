const DonorSignup = () => {
  return (
    <div className="min-h-screen bg-red-50 flex justify-center items-center p-4">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">

        <h2 className="text-2xl font-bold text-red-600 mb-6">
          Donor Registration
        </h2>

        <form className="space-y-4">

          <input
            type="text"
            placeholder="First Name"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Last Name"
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

          <select className="w-full border p-3 rounded-lg bg-white">
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

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
            Register
          </button>

        </form>
      </div>
    </div>
  );
};

export default DonorSignup;