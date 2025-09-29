
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';
import { MOCK_COURSES, MOCK_LEADERBOARD } from '../constants';
import ProgressBar from '../components/ProgressBar';
import { Link } from 'react-router-dom';
import { BookOpenIcon, UsersIcon, TrophyIcon, FireIcon } from '../components/Icons';

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const { xp, level } = useGamification();

    if (!user) return null;

    const levelProgress = ((xp % 1000) / 1000) * 100;
    const userRank = MOCK_LEADERBOARD.find(u => u.id === user.id)?.rank || 'N/A';

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-poppins font-bold text-navy">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="text-gray-600 mt-1">Ready to continue your professional journey?</p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Gamification Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <StatCard title="Your Level" value={level} icon={TrophyIcon} color="gold" />
                        <StatCard title="Total XP" value={xp} icon={SparklesIcon} color="teal" />
                        <StatCard title="Daily Streak" value={`${user.streak} Days`} icon={FireIcon} color="coral" />
                    </div>

                     {/* Level Progress */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-poppins font-bold text-lg text-navy">Level Progress</h3>
                        <p className="text-sm text-gray-500 mb-4">You're {1000 - (xp % 1000)} XP away from Level {level + 1}!</p>
                        <ProgressBar value={levelProgress} color="gold" className="h-4" />
                    </div>

                    {/* Active Courses */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-poppins font-bold text-lg text-navy mb-4">Continue Learning</h3>
                        <div className="space-y-4">
                            {MOCK_COURSES.slice(0, 2).map((course, index) => (
                                <Link to={`/courses/${course.id}`} key={course.id} className="block hover:bg-gray-50 p-4 rounded-md transition-colors">
                                    <div className="flex items-center gap-4">
                                        <img src={course.thumbnail} alt={course.title} className="w-24 h-16 object-cover rounded-md"/>
                                        <div className="flex-1">
                                            <p className="font-bold text-navy">{course.title}</p>
                                            <ProgressBar value={index === 0 ? 60 : 25} className="mt-2 h-2" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Upcoming Mentorship */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-poppins font-bold text-lg text-navy mb-4">Upcoming Session</h3>
                         <div className="flex items-center gap-4">
                             <img src="https://picsum.photos/seed/evelyn/100/100" alt="Dr. Evelyn Reed" className="w-12 h-12 rounded-full"/>
                             <div>
                                <p className="font-bold">Dr. Evelyn Reed</p>
                                <p className="text-sm text-gray-500">Tomorrow at 2:00 PM</p>
                             </div>
                         </div>
                         <button className="w-full mt-4 bg-teal text-white font-bold py-2 rounded-md hover:bg-opacity-90 transition-colors">
                             Join Call
                         </button>
                    </div>

                     {/* Leaderboard Snapshot */}
                     <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="font-poppins font-bold text-lg text-navy mb-4">Leaderboard</h3>
                        <ul className="space-y-3">
                            {MOCK_LEADERBOARD.slice(0, 3).map(player => (
                                <li key={player.id} className={`flex items-center justify-between p-2 rounded-md ${player.id === user.id ? 'bg-gold/30' : ''}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="font-mono font-bold w-6 text-center">{player.rank}</span>
                                        <img src={player.avatar} alt={player.name} className="w-8 h-8 rounded-full" />
                                        <span className="font-medium">{player.name}</span>
                                    </div>
                                    <span className="font-mono text-sm text-gray-600">{player.xp} XP</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-center mt-4 text-sm text-gray-500">Your Rank: <span className="font-bold text-navy">{userRank}</span></p>
                     </div>
                </div>
            </div>
        </div>
    );
};

const StatCard: React.FC<{title: string; value: string | number; icon: React.ComponentType<{className?: string}>; color: 'teal' | 'gold' | 'coral'}> = ({ title, value, icon: Icon, color }) => {
    const colorClasses = {
        teal: 'bg-teal/10 text-teal',
        gold: 'bg-gold/10 text-yellow-600',
        coral: 'bg-coral/10 text-coral',
    }
    return (
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4">
            <div className={`p-3 rounded-full ${colorClasses[color]}`}>
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold font-poppins text-navy">{value}</p>
            </div>
        </div>
    )
}

// SparklesIcon needs to be defined for StatCard
const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.672-2.672L11.25 18l1.938-.648a3.375 3.375 0 002.672-2.672L16.25 13.5l.648 1.938a3.375 3.375 0 002.672 2.672L21.5 18l-1.938.648a3.375 3.375 0 00-2.672 2.672z" />
    </svg>
);


export default Dashboard;
