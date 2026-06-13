import React, { useState, useEffect } from 'react';

const DonorSearch = () => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBloodType, setSelectedBloodType] = useState('');

    
    const [allDonors, setAllDonors] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [loading, setLoading] = useState(false);

  
    useEffect(() => {
        const fetchDonors = async () => {
            setLoading(true);
            try {
                
                const response = await fetch('http://localhost:8000/api/all-donors');
                if (response.ok) {
                    const data = await response.json();
                    setAllDonors(data);
                    setFilteredDonors(data);
                }
            } catch (error) {
                console.error("Error fetching donor directory:", error);

                
                const mockDb = [
                    { id: 1, name: "Prince Evanson", bloodType: "A+", phone: "0795336903", email: "prince@example.com", age: 19 },
                    { id: 2, name: "Marie Adisa", bloodType: "A-", phone: "0722111222", email: "marieadisa@example.xom", age: 19},
                    { id: 3, name: "Michael Otieno", bloodType: "O-", phone: "0733444555", email: "mike@example.com", age: 28 },
                    { id: 4, name: "Amina Yusuf", bloodType: "AB+", phone: "0744555666", email: "amina@example.com", age: 22 },
                ];
                setAllDonors(mockDb);
                setFilteredDonors(mockDb);
            } finally {
                setLoading(false);
            }
        };

        fetchDonors();
    }, []);

    useEffect(() => {
        let results = allDonors;

        if (searchTerm) {
            results = results.filter(donor =>
                donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donor.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedBloodType) {
            results = results.filter(donor => donor.bloodType === selectedBloodType);
        }

        setFilteredDonors(results);
    }, [searchTerm, selectedBloodType, allDonors]);

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">

                {/* Header section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Registered Donors Directory</h1>
                    <p className="text-sm text-gray-600 mt-1">Search, filter, and contact active blood donors across the system.</p>
                </div>

                {/* Search & Filter Controls bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <label className="sr-only">Search by name or email</label>
                        <input
                            type="text"
                            placeholder="Search by donor name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        />
                    </div>

                    <div className="w-full md:w-48">
                        <select
                            value={selectedBloodType}
                            onChange={(e) => setSelectedBloodType(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white"
                        >
                            <option value="">All Blood Types</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>
                </div>

                {/* Results grid */}
                {loading ? (
                    <div className="text-center text-gray-500 py-10">Loading donors database...</div>
                ) : filteredDonors.length === 0 ? (
                    <div className="text-center bg-white border border-dashed border-gray-300 rounded-xl p-12 text-gray-500">
                        No donors found matching your search criteria.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredDonors.map((donor) => (
                            <div key={donor.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition duration-200">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{donor.name}</h3>
                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mt-0.5">Age: {donor.age}</p>
                                    </div>
                                    <span className="bg-red-100 text-red-700 text-sm font-extrabold px-3 py-1 rounded-md border border-red-200">
                                        {donor.bloodType}
                                    </span>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-100 space-y-1.5 text-sm text-gray-600">
                                    <div className="flex items-center">
                                        <span className="font-medium w-16 text-gray-400">Phone:</span>
                                        <span className="text-gray-800 font-mono">{donor.phone}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="font-medium w-16 text-gray-400">Email:</span>
                                        <span className="text-gray-800 truncate">{donor.email}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

export default DonorSearch;