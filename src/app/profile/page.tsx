// src/app/profile/page.tsx
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
// Perbaikan: Hanya impor ikon yang digunakan untuk menghapus warning unused vars
import { User, Bell, ClipboardList, Ticket, LucideIcon } from "lucide-react";

// Perbaikan: Tambahkan interface untuk props SidebarItem agar tidak menggunakan 'any'
interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    active?: boolean;
}

export default async function ProfilePage() {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) redirect("/login");

    const profile = await prisma.profile.findUnique({
        where: { id: session.user.id }
    });

    return (
        <div className="bg-[#f2f7fa] min-h-screen py-10 px-4 font-sans">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">

                {/* SIDEBAR */}
                <aside className="w-full md:w-64 space-y-6">
                    <div className="flex flex-col items-center">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm mb-3">
                            <Image src={profile?.avatarUrl || "/placeholder-user.png"} alt="Avatar" fill className="object-cover" />
                        </div>
                        <button className="bg-[#002b45] text-white flex items-center gap-2 px-6 py-2 rounded-full text-xs font-bold shadow-md hover:bg-[#001d2e] transition">
                            <span className="bg-white text-[#002b45] rounded-sm p-0.5">🛒</span> Start Selling
                        </button>
                    </div>

                    <nav className="space-y-1">
                        <SidebarItem icon={User} label="My Account" active />
                        <div className="pl-9 space-y-2 pb-2">
                            <p className="text-xs text-[#002b45] font-bold cursor-pointer">Profile</p>
                            <p className="text-xs text-gray-500 cursor-pointer hover:text-[#002b45]">Address</p>
                            <p className="text-xs text-gray-500 cursor-pointer hover:text-[#002b45]">Change Password</p>
                            <p className="text-xs text-gray-500 cursor-pointer hover:text-[#002b45]">Notification Settings</p>
                            <p className="text-xs text-gray-500 cursor-pointer hover:text-[#002b45]">Privacy Settings</p>
                        </div>
                        <SidebarItem icon={ClipboardList} label="My orders" />
                        <SidebarItem icon={Bell} label="Notifications" />
                        <SidebarItem icon={Ticket} label="My Vouchers" />
                    </nav>
                </aside>

                {/* MAIN CONTENT CARD */}
                <div className="flex-1 bg-white rounded-[40px] shadow-sm p-8 md:p-12 border border-gray-50">
                    <div className="border-b pb-4 mb-10">
                        <h1 className="text-xl font-bold text-[#002b45]">My Profile</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Form Fields */}
                        <div className="flex-1 space-y-6">
                            <ProfileField label="Username" value={profile?.username || "uinique_user"} />
                            <ProfileField label="Name" value={profile?.name || ""} isInput />
                            <ProfileField label="Email" value={profile?.email || ""} />
                            <ProfileField label="Phone Number" value={profile?.phoneNumber || ""} isInput />
                            <ProfileField label="Shop Name" value={profile?.shopName || ""} isInput />

                            <div className="flex items-center gap-8 py-2">
                                <span className="text-sm text-gray-500 w-32">Gender</span>
                                <div className="flex gap-4 text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="gender" value="Male" defaultChecked={profile?.gender === "Male"} /> Male
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="gender" value="Female" defaultChecked={profile?.gender === "Female"} /> Female
                                    </label>
                                </div>
                            </div>

                            <ProfileField label="Date of Birth" value={profile?.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : ""} isInput />

                            <div className="pt-6">
                                <button className="bg-[#002b45] text-white px-10 py-2.5 rounded-full font-bold text-sm hover:opacity-90 shadow-lg">
                                    Save Changes
                                </button>
                            </div>
                        </div>

                        {/* Avatar Selector */}
                        <div className="w-full lg:w-72 flex flex-col items-center border-l lg:pl-12 border-gray-100">
                            <div className="relative w-40 h-40 rounded-full overflow-hidden mb-6 shadow-md border-2 border-gray-100">
                                <Image src={profile?.avatarUrl || "/placeholder-user.png"} alt="Avatar Large" fill className="object-cover" />
                            </div>
                            <button className="border border-gray-300 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                                Select Image
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

// Sub-komponen Sidebar
function SidebarItem({ icon: Icon, label, active = false }: SidebarItemProps) {
    return (
        <div className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${active ? 'text-[#002b45]' : 'text-gray-500 hover:bg-gray-50'}`}>
            <Icon size={18} />
            <span className={`text-sm ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
        </div>
    );
}

// Sub-komponen Form Field
function ProfileField({ label, value, isInput = false }: { label: string, value: string, isInput?: boolean }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
            <span className="text-sm text-gray-500 w-32">{label}</span>
            {isInput ? (
                <input
                    type="text"
                    defaultValue={value}
                    className="flex-1 border border-gray-300 rounded-full px-5 py-2 text-sm focus:ring-2 focus:ring-[#002b45]/20 outline-none"
                />
            ) : (
                <span className="text-sm font-medium text-gray-800">{value}</span>
            )}
        </div>
    );
}