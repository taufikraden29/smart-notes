import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../services/supabase";

const Home = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
                navigate('/');
            } else {
                setUser(data.user);
            }
        };

        getUser();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Dashboard</h1>
                <p className="text-gray-600 mb-6">
                    Welcome, <span className="font-medium text-gray-900">{user?.email}</span>
                </p>
                <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                    Logout
                </button>
            </div>
            <div>
                <Link to="/add">+ Add Transaction</Link>
            </div>
        </div>
    );
};

export default Home;
