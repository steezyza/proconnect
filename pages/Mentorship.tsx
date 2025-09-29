
import React from 'react';
import { MOCK_MENTORS } from '../constants';

const MentorCard: React.FC<{ mentor: typeof MOCK_MENTORS[0] }> = ({ mentor }) => (
    <div className="bg-white rounded-lg shadow-md p-6 text-center flex flex-col items-center">
        <img src={mentor.avatar} alt={mentor.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
        <h3 className="text-xl font-poppins font-bold text-navy">{mentor.name}</h3>
        <p className="text-teal font-medium">{mentor.title}</p>
        <div className="my-4 flex flex-wrap justify-center gap-2">
            {mentor.specialties.map(spec => (
                <span key={spec} className="bg-light-blue/50 text-navy text-xs font-semibold px-2.5 py-1 rounded-full">{spec}</span>
            ))}
        </div>
        <p className="text-sm text-gray-600 flex-grow">{mentor.bio}</p>
        <button 
            onClick={() => alert(`Booking session with ${mentor.name}`)}
            className="mt-6 w-full bg-navy text-white font-bold py-2 rounded-md hover:bg-opacity-90 transition-colors"
        >
            Book Session
        </button>
    </div>
);

const Mentorship: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-poppins font-bold text-navy">Connect with Mentors</h1>
                <p className="text-gray-600 mt-1">Book 1:1 sessions with industry experts to accelerate your career.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_MENTORS.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                ))}
            </div>

            {/* Mock Chat UI */}
            <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-poppins font-bold text-lg text-navy mb-4">Your Messages</h3>
                <div className="border rounded-lg h-96 flex flex-col">
                    <div className="p-4 border-b font-semibold">Chat with Dr. Evelyn Reed</div>
                    <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50">
                        <div className="flex justify-end">
                            <p className="bg-teal text-white p-3 rounded-lg max-w-xs">Hi Dr. Reed, looking forward to our session tomorrow!</p>
                        </div>
                        <div className="flex justify-start">
                             <p className="bg-gray-200 text-navy p-3 rounded-lg max-w-xs">Hi Alex, me too! Please come prepared with your questions.</p>
                        </div>
                    </div>
                    <div className="p-4 border-t">
                        <input type="text" placeholder="Type your message..." className="w-full px-4 py-2 border rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mentorship;
