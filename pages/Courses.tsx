
import React, { useState, useMemo } from 'react';
import { MOCK_COURSES } from '../constants';
import { Link } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../contexts/AuthContext';

const CourseCard: React.FC<{ course: typeof MOCK_COURSES[0], completed: boolean }> = ({ course, completed }) => (
    <Link to={`/courses/${course.id}`} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 flex flex-col">
        <img className="h-40 w-full object-cover" src={course.thumbnail} alt={course.title} />
        <div className="p-6 flex-grow flex flex-col">
            <span className="text-xs font-semibold uppercase text-teal">{course.category}</span>
            <h3 className="mt-2 text-lg font-poppins font-bold text-navy">{course.title}</h3>
            <p className="mt-2 text-sm text-gray-600 flex-grow">{course.description}</p>
            <div className="mt-4">
                <ProgressBar value={completed ? 100 : 0} />
            </div>
        </div>
    </Link>
);

const Courses: React.FC = () => {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...Array.from(new Set(MOCK_COURSES.map(c => c.category)))];

    const filteredCourses = useMemo(() => {
        return MOCK_COURSES.filter(course => {
            const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || course.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchTerm, selectedCategory]);
    
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-poppins font-bold text-navy">Course Library</h1>
                <p className="text-gray-600 mt-1">Expand your expertise with our curated courses.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <input 
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal"
                />
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 text-sm rounded-full font-semibold whitespace-nowrap transition-colors ${selectedCategory === category ? 'bg-navy text-white' : 'bg-white text-navy hover:bg-light-blue'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} completed={user?.completedCourseIds.includes(course.id) || false} />
                ))}
            </div>
        </div>
    );
};

export default Courses;
