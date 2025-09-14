import { useState } from "react";
import Button from "~/components/ui/Button";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock newsletter signup
        alert(`Thanks for subscribing with ${email}!`);
        setEmail("");
    };

    return (
        <footer className="bg-gray-200 text-white px-4 py-8 lg:px-14" role="contentinfo">
            <div className="max-w-screen-2xl mx-auto">
                {/* Newsletter Section */}
                <div className="text-center mb-8">
                    <h2 className="text-lg font-semibold text-gray-950 mb-3">
                        Stay Updated
                    </h2>
                    <p className="text-sm text-gray-950 mb-6 max-w-md mx-auto">
                        Get the latest updates on new products, exclusive deals, and special offers delivered straight to your inbox.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            required
                            className="flex-1 text-sm px-4 py-3 rounded-lg border border-gray-600 bg-gray-200 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            aria-label="Email address for newsletter"
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            size="small"
                        >
                            Subscribe
                        </Button>
                    </form>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 pt-8">
                    {/* Legal Links */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-700">
                            © {new Date().getFullYear()} The Online Store. All rights reserved.
                        </div>

                        <nav aria-label="Legal navigation">
                            <ul className="flex flex-wrap justify-center gap-6 text-sm">
                                <li>
                                    <button className="text-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded">
                                        Privacy Policy
                                    </button>
                                </li>
                                <li>
                                    <button className="text-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded">
                                        Terms of Service
                                    </button>
                                </li>
                                <li>
                                    <button className="text-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded">
                                        Cookie Policy
                                    </button>
                                </li>
                                <li>
                                    <button className="text-gray-700 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-950 rounded">
                                        Return Policy
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;