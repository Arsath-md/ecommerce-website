export default function Footer() {
    let dates = new Date()
    return (
        <footer className="mt-24 bg-orange-500 rounded  text-white">
            <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                {/* Brand section */}
                <div>
                    <div className="flex items-center gap-3">
                        <img
                            src="/joe.jpeg"
                            alt="VippiWear Logo"
                            className="h-12 w-12 rounded-full object-cover border border-white/30"
                        />

                        <h1 className="text-3xl font-black tracking-wide">
                            Joeclothings
                        </h1>
                    </div>

                    <p className="mt-5 text-white/70 leading-7">
                        Streetwear fashion made for the new generation.
                        Minimal. Bold. Premium.
                    </p>

                    <div className="flex gap-4 mt-6">
                        <button className="bg-red-500 hover:bg-orange-600 transition px-4 py-2 rounded-full font-bold">
                            Instagram
                        </button>

                        <button className="bg-green-600 hover:bg-white/20 transition px-4 py-2 rounded-full font-bold">
                            WhatsApp
                        </button>
                    </div>
                </div>

                {/* Shop links */}
                <div>
                    <h2 className="text-2xl font-bold mb-5">
                        Shop
                    </h2>

                    <ul className="space-y-3 text-white/70 font-medium">
                        <li className="hover:text-orange-300 cursor-pointer transition">
                            Hoodies
                        </li>

                        <li className="hover:text-orange-300 cursor-pointer transition">
                            T-Shirts
                        </li>

                        <li className="hover:text-orange-300 cursor-pointer transition">
                            Sneakers
                        </li>

                        <li className="hover:text-orange-300 cursor-pointer transition">
                            New Arrivals
                        </li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h2 className="text-2xl font-bold mb-5">
                        Company
                    </h2>

                    <ul className="space-y-3 text-white/70 font-medium">
                        <li className="hover:text-orange-300 cursor-pointer transition">
                            About Us
                        </li>

                        <li className="hover:text-orange-300 cursor-pointer transition">
                            Contact
                        </li>

                        <li className="hover:text-orange-300 cursor-pointer transition">
                            FAQ
                        </li>

                        <li className="hover:text-orange-300 cursor-pointer transition">
                            Privacy Policy
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h2 className="text-2xl font-bold mb-5">
                        Join The Drop
                    </h2>

                    <p className="text-white/70 leading-7 mb-5">
                        Get notified about new collections, offers and exclusive releases.
                    </p>

                    <div className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white/10 border border-white/10 rounded-full px-5 py-3 outline-none focus:border-orange-400 placeholder:text-white/40"
                        />

                        <button className="bg-yellow-400 hover:bg-orange-600 transition py-3 rounded-full font-bold">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom footer */}
            <div className="border-t border-white/10 py-5 px-6 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
                <p>
                    © {dates.getFullYear()} VippiWear. All rights reserved.
                </p>

                <div className="flex gap-6 mt-4 md:mt-0">
                    <p className="hover:text-orange-300 cursor-pointer transition">
                        Terms
                    </p>

                    <p className="hover:text-orange-300 cursor-pointer transition">
                        Privacy
                    </p>

                    <p className="hover:text-orange-300 cursor-pointer transition">
                        Support
                    </p>
                </div>
            </div>
        </footer>
    )
}
