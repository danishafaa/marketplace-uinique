import React from 'react';
import Image from 'next/image';

const UserProfilePage = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header sudah ada di components/Header.tsx dalam src.rar Anda */}

            <main className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
                {/* Sidebar Menu */}
                <aside className="w-64 flex-shrink-0">
                    <div className="mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden border">
                            <img src="/api/placeholder/64/64" alt="User Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    <nav className="space-y-4 text-sm text-[#002d4b]">
                        <div>
                            <div className="flex items-center gap-2 font-bold mb-2 cursor-pointer">
                                <i className="far fa-user text-lg"></i> My Account
                            </div>
                            <ul className="pl-7 space-y-2">
                                <li className="text-blue-500 font-medium cursor-pointer">Profile</li>
                                <li className="hover:text-blue-400 cursor-pointer">Bank & Cards</li>
                                <li className="hover:text-blue-400 cursor-pointer">Address</li>
                                <li className="hover:text-blue-400 cursor-pointer">Change Password</li>
                                <li className="hover:text-blue-400 cursor-pointer">Notification Settings</li>
                                <li className="hover:text-blue-400 cursor-pointer">Privacy Settings</li>
                            </ul>
                        </div>

                        <div className="flex items-center gap-2 cursor-pointer pt-2">
                            <i className="fas fa-clipboard-list text-lg"></i> My orders
                        </div>

                        <div className="pt-2">
                            <div className="flex items-center gap-2 cursor-pointer mb-2">
                                <i className="far fa-bell text-lg"></i> Notifications
                            </div>
                            <ul className="pl-7 space-y-2 text-gray-600">
                                <li className="cursor-pointer hover:text-black">Status Order</li>
                                <li className="cursor-pointer hover:text-black">Promo</li>
                                <li className="cursor-pointer hover:text-black">Info</li>
                            </ul>
                        </div>

                        <div className="flex items-center gap-2 cursor-pointer pt-2">
                            <i className="fas fa-ticket-alt text-lg"></i> My Vouchers
                        </div>
                    </nav>
                </aside>

                {/* Profile Card Section */}
                <section className="flex-grow">
                    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                        <div className="p-4 border-b">
                            <h2 className="text-xl font-medium text-[#002d4b]">My Profile</h2>
                        </div>

                        <div className="p-8 flex flex-col md:flex-row">
                            {/* Form Side */}
                            <div className="flex-grow space-y-6 max-w-xl">
                                <div className="flex items-center">
                                    <label className="w-32 text-right mr-6 text-gray-600">Username</label>
                                    <span className="text-gray-800">user_123</span>
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 text-right mr-6 text-gray-600">Name</label>
                                    <input type="text" className="flex-grow border border-[#002d4b] rounded-full px-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-300" />
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 text-right mr-6 text-gray-600">Email</label>
                                    <span className="text-gray-800">user@example.com</span>
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 text-right mr-6 text-gray-600">Phone Number</label>
                                    <span className="text-gray-800">08123456789</span>
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 text-right mr-6 text-gray-600">Shop Name</label>
                                    <input type="text" className="flex-grow border border-[#002d4b] rounded-full px-4 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-300" />
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 text-right mr-6 text-gray-600">Gender</label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="gender" className="w-4 h-4 accent-[#002d4b]" /> Male
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="radio" name="gender" className="w-4 h-4 accent-[#002d4b]" /> Female
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <label className="w-32 text-right mr-6 text-gray-600">Date of Birth</label>
                                    <span className="text-gray-400">DD / MM / YYYY</span>
                                </div>

                                <div className="pt-4">
                                    <button className="ml-38 bg-[#002d4b] text-white px-10 py-2 rounded-lg hover:bg-[#003d66] transition-colors font-medium">
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            {/* Avatar Upload Side */}
                            <div className="w-full md:w-64 flex flex-col items-center justify-start border-l pl-8 space-y-4 mt-8 md:mt-0">
                                <div className="w-32 h-32 rounded-full overflow-hidden border-2 p-1">
                                    <img src="/api/placeholder/128/128" alt="Large Avatar" className="w-full h-full object-cover rounded-full" />
                                </div>
                                <button className="border border-[#002d4b] px-4 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                                    Select Image
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default UserProfilePage;