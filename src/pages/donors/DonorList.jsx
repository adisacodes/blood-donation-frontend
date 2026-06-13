import { useState, useEffect } from "react"
import Navbar from "../../components/Navbar"

const DonorList = () => {
    const [donors, setDonors] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        fetch("http://localhost:8000/donors")
            .then(res => res.json())
            .then(data => {

                if (Array.isArray(data)) {
                    setDonors(data)
                } else {
                    setDonors([])
                }
            })
            .catch(err => console.error("Error Getting Donors:", err))
    }, [])


    const activeDonors = donors.filter(donor => donor.is_logged_in)
    const totalActiveCount = activeDonors.length


    const bloodTypeCounts = {
        "A+": 0, "A-": 0, "B+": 0, "B-": 0,
        "AB+": 0, "AB-": 0, "O+": 0, "O-": 0
    }

    activeDonors.forEach(donor => {
        const type = donor.blood_type?.toUpperCase()
        if (type in bloodTypeCounts) {
            bloodTypeCounts[type] += 1
        }
    })


    const filteredDonors = donors.filter(donor =>
        donor.blood_type?.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">


            <div className="max-w-6xl mx-auto mt-6">




                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3 mb-8">
                    {Object.entries(bloodTypeCounts).map(([type, count]) => (
                        <div
                            key={type}
                            className={`p-3 rounded-xl border text-center transition-all ${count > 0
                                ? 'bg-red-50 border-red-300 ring-1 ring-red-200'
                                : 'bg-white border-gray-200'
                                }`}
                        >
                            <p className="text-sm font-bold text-gray-500">{type}</p>
                            <p className={`text-xl font-extrabold ${count > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                                {count} <span className="text-[10px] font-normal block text-gray-400">Available</span>
                            </p>
                        </div>
                    ))}
                </div>


                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by blood type e.g O+"
                        className="border border-gray-300 p-3 rounded-xl w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {filteredDonors.length > 0 ? (
                        filteredDonors.map((donor, index) => (
                            <div key={index} className="bg-white shadow-sm rounded-xl p-5 border border-gray-200 border-l-4 border-l-red-600 flex flex-col justify-between hover:shadow-md transition-shadow">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="font-bold text-lg text-gray-800">{donor.name}</p>
                                        {donor.is_logged_in ? (
                                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span> Available
                                            </span>
                                        ) : (
                                            <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                Not Available
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold text-gray-700">Blood Type:</span> {donor.blood_type}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        <span className="font-semibold text-gray-700">Location:</span> {donor.location}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 col-span-full text-center py-10">No donors found matching that criteria.</p>
                    )}
                </div>

            </div>
        </div>
    )
}

export default DonorList