import React, { useState } from 'react';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log(`Subscribing ${email} to the newsletter.`);
            // Mock Mailchimp API call
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <footer className="bg-navy text-off-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col items-start">
                        <div className="flex items-center gap-2 mb-2">
<<<<<<< HEAD
                             <img src="/src/assets/white-logo.svg" alt="ProConnect Logo" className="h-8 w-auto" />
=======
                             <img src="/src/assets/full-logo-2.svg" alt="ProConnect Logo" className="h-8 w-auto" />
>>>>>>> 24bf61a (Add initial files)
                        </div>
                        <p className="text-sm text-light-blue">&copy; {new Date().getFullYear()} ProConnect. All rights reserved.</p>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="font-poppins font-semibold text-lg mb-2">Stay Ahead of the Curve</h3>
                        <p className="text-sm text-light-blue mb-4">Subscribe to our newsletter for the latest in finance and auditing trends, new courses, and exclusive content.</p>
                        {subscribed ? (
                             <p className="text-teal font-bold">Thank you for subscribing!</p>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email" 
                                    className="flex-grow px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-teal focus:outline-none"
                                    required
                                />
                                <button type="submit" className="px-6 py-2 rounded-md bg-teal text-white font-semibold hover:bg-opacity-80 transition-colors">
                                    Subscribe
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;