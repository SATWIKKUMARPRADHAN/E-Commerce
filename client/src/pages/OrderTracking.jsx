import React, { useState } from 'react';
import axios from 'axios';
import { Search, Truck, MapPin, CheckCircle, Clock } from 'lucide-react';

export default function OrderTracking() {
    const [awb, setAwb] = useState('');
    const [trackingData, setTrackingData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!awb) return;

        setLoading(true);
        setError('');
        setTrackingData(null);

        try {
            // Call YOUR backend, not Shiprocket directly
            const res = await axios.get(`http://localhost:3030/api/track/${awb}`);
            setTrackingData(res.data);
        } catch (err) {
            setError('Could not find tracking details. Please check the AWB number.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
                    <p className="mt-2 text-gray-600">Enter your AWB number to see real-time updates</p>
                </div>

                {/* Search Box */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                    <form onSubmit={handleTrack} className="flex gap-4">
                        <input
                            type="text"
                            placeholder="Enter AWB Number (e.g., 123456 (default))"
                            value={awb}
                            onChange={(e) => setAwb(e.target.value)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
                        >
                            {loading ? 'Tracking...' : 'Track'}
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
                </div>

                {/* Tracking Results */}
                {trackingData && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Status Header */}
                        <div className="bg-gray-900 p-6 text-white flex justify-between items-center">
                            <div>
                                <p className="text-sm opacity-75">Current Status</p>
                                <h2 className="text-2xl font-bold">{trackingData.track_status || "In Transit"}</h2>
                            </div>
                            <Truck size={32} />
                        </div>

                        {/* Timeline */}
                        <div className="p-6">
                            <div className="relative border-l-2 border-gray-200 ml-4 space-y-8">
                                {trackingData.shipment_track_activities?.map((activity, index) => (
                                    <div key={index} className="relative pl-8">
                                        {/* Dot */}
                                        <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white ${index === 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        
                                        {/* Content */}
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                            <div>
                                                <h4 className={`text-lg font-semibold ${index === 0 ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {activity.activity}
                                                </h4>
                                                <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                                    <MapPin size={14} /> {activity.location}
                                                </p>
                                            </div>
                                            <div className="text-right mt-2 sm:mt-0">
                                                <p className="text-sm font-medium text-gray-900">{activity.date.split(' ')[0]}</p>
                                                <p className="text-xs text-gray-500">{activity.date.split(' ')[1]}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}