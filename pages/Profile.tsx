
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useGamification } from '../contexts/GamificationContext';
import { BADGE_DEFINITIONS } from '../constants';
import { Badge } from '../types';

const BadgeIcon: React.FC<{ badgeDef: Badge }> = ({ badgeDef }) => (
    <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg">
        <div className="p-3 rounded-full bg-gold/20 text-yellow-600">
            <badgeDef.icon className="h-8 w-8"/>
        </div>
        <p className="mt-2 font-bold text-sm">{badgeDef.name}</p>
        <p className="text-xs text-gray-500">{badgeDef.description}</p>
    </div>
);


const Profile: React.FC = () => {
    const { user } = useAuth();
    const { xp, level, badges } = useGamification();

    if (!user) return null;

    const earnedBadges = badges.map(key => BADGE_DEFINITIONS[key]);

    return (
        <div className="space-y-8">
             <div>
                <h1 className="text-3xl font-poppins font-bold text-navy">My Profile</h1>
                <p className="text-gray-600 mt-1">View your progress and manage your account.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                    <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mb-4 ring-4 ring-teal/50" />
                    <h2 className="text-2xl font-poppins font-bold text-navy">{user.name}</h2>
                    <p className="text-gray-500 capitalize">{user.role}</p>
                    <p className="mt-2 text-sm text-gray-700">{user.email}</p>
                </div>
                
                {/* Stats */}
                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-poppins font-bold text-lg text-navy mb-4">Your Statistics</h3>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-light-blue/30 p-4 rounded-lg">
                            <p className="text-sm text-navy">Level</p>
                            <p className="text-4xl font-mono font-bold text-navy">{level}</p>
                        </div>
                         <div className="bg-light-blue/30 p-4 rounded-lg">
                            <p className="text-sm text-navy">Total XP</p>
                            <p className="text-4xl font-mono font-bold text-navy">{xp.toLocaleString()}</p>
                        </div>
                         <div className="bg-light-blue/30 p-4 rounded-lg">
                            <p className="text-sm text-navy">Courses Completed</p>
                            <p className="text-4xl font-mono font-bold text-navy">{user.completedCourseIds.length}</p>
                        </div>
                        <div className="bg-light-blue/30 p-4 rounded-lg">
                            <p className="text-sm text-navy">Badges Earned</p>
                            <p className="text-4xl font-mono font-bold text-navy">{badges.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Badges Earned */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-poppins font-bold text-lg text-navy mb-4">Badges Earned</h3>
                {earnedBadges.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {earnedBadges.map(badge => (
                            <BadgeIcon key={badge.key} badgeDef={badge} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No badges earned yet. Keep learning to unlock them!</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
