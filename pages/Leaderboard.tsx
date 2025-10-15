
import React from 'react';
import { MOCK_LEADERBOARD } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { TrophyIcon } from '../components/Icons';

const Leaderboard: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-poppins font-bold text-navy flex items-center gap-3">
                    <TrophyIcon className="h-8 w-8 text-gold" />
                    Leaderboard
                </h1>
                <p className="text-gray-600 mt-1">See how you stack up against the top learners.</p>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">XP</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {MOCK_LEADERBOARD.map((player) => (
                            <tr key={player.id} className={player.id === user?.id ? 'bg-gold/20' : ''}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-xl font-bold font-mono text-center w-8">
                                        {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={player.avatar} alt={player.name} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{player.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-now_rap text-sm text-gray-500">
                                    <span className="font-mono bg-light-blue/50 text-navy font-semibold px-2 py-1 rounded">{player.level}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold font-mono text-gray-900">{player.xp.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
