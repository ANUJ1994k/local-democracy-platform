import React, { useEffect, useState } from "react";
import { socket } from "../context/SocketContext";

const LiveAlerts = ({ userLocation }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Listen for new alerts
    socket.on("receive_alert", (data) => {
      if (data.location === userLocation) {
        setAlerts((prev) => [data, ...prev]); // Add new alerts at the top
      }
    });

    // Cleanup
    return () => {
      socket.off("receive_alert");
    };
  }, [userLocation]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">🔔 Live Alerts</h2>
      <div className="space-y-3">
        {alerts.length === 0 && <p>No alerts yet...</p>}
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="border-l-4 border-red-500 bg-red-100 p-3 rounded"
          >            <p className="text-sm text-gray-800">
              <strong>{alert.location}</strong>: {alert.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveAlerts;
