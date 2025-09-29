
import React from 'react';
import { MOCK_FORUM_POSTS } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { BadgeKey } from '../types';
import { useGamification } from '../contexts/GamificationContext';

const Forum: React.FC = () => {
    const { user } = useAuth();
    const { addXp, addBadge } = useGamification();

    const handleNewPost = () => {
        // Mock function
        addXp(20);
        addBadge(BadgeKey.FIRST_FORUM_POST);
        alert("Your post has been submitted! +20 XP");
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-poppins font-bold text-navy">Community Forum</h1>
                <p className="text-gray-600 mt-1">Ask questions, share insights, and connect with peers.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-poppins font-bold text-lg text-navy mb-2">Create a New Post</h3>
                <textarea className="w-full p-2 border rounded-md" placeholder="What's on your mind?"></textarea>
                <button onClick={handleNewPost} className="mt-2 px-6 py-2 bg-teal text-white font-bold rounded-md hover:bg-opacity-90">
                    Post (+20 XP)
                </button>
            </div>

            <div className="space-y-6">
                {MOCK_FORUM_POSTS.map(post => (
                    <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex gap-4">
                            <div className="flex flex-col items-center">
                                <button className="text-lg">▲</button>
                                <span className="font-bold text-lg">{post.upvotes}</span>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-poppins font-bold text-navy">{post.title}</h2>
                                <p className="text-sm text-gray-500">
                                    Posted by {post.author.name} • {post.createdAt}
                                </p>
                                <p className="mt-4 text-gray-700">{post.content}</p>
                            </div>
                        </div>

                        {/* Comments */}
                        <div className="mt-6 border-t pt-4 space-y-4">
                            <h4 className="font-bold">Comments ({post.comments.length})</h4>
                            {post.comments.map(comment => (
                                <div key={comment.id} className="flex gap-3">
                                    <img src={comment.author.avatar} alt={comment.author.name} className="w-8 h-8 rounded-full" />
                                    <div className="bg-gray-100 p-3 rounded-lg flex-1">
                                        <p className="font-semibold text-sm">{comment.author.name}</p>
                                        <p className="text-sm">{comment.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Forum;
