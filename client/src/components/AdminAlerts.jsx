import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './AdminAlerts.css'

const socket = io('http://localhost:5000'); // connect to backend

function AdminAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [location, setLocation] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        socket.on('receive_alert', (alert) => {
            setAlerts((prev) => [alert, ...prev]);
        });

        return () => {
            socket.off('receive_alert');
        };
    }, []);

    const sendAlert = () => {
        if (location && message) {
            const alert = { location, message };
            socket.emit('send_alert', alert);
            setLocation('');
            setMessage('');
        }
    };

    return (
        <div className="p-4 font-sans max-w-xl mx-auto flex flex-col">
            <div className="form">
                <h1 className="text-xl font-bold mb-4">📢 Admin Panel - Send Live Alert</h1>

                <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="border p-2 mb-2 w-full rounded"
                />
                <textarea
                    placeholder="Enter alert message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border p-2 mb-2 w-full rounded"
                />
                <button
                    onClick={sendAlert}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Send Alert
                </button>
            </div>

            <div className="mt-6">
                <h2 className="font-semibold mb-2">🔔 Live Alerts</h2>
                {alerts.map((alert, index) => {

                    return (
                        <div key={index} className="bg-yellow-100 border-l-4 border-yellow-500 p-2 mb-2 rounded shadow-sm animate-fade-in">
                            <div><strong>{alert.location}:</strong> {alert.message}</div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default AdminAlerts;
