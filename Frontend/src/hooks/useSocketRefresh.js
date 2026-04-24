import { useEffect } from "react";
import socket from "../utils/socket";

/**
 * Custom Hook: useSocketRefresh
 * Listens for a specific socket event and triggers a callback (usually a fetch function).
 * 
 * @param {string} eventName - The socket event to listen for (e.g., 'REFRESH_STATS')
 * @param {function} callback - The function to run when the event is received
 */
const useSocketRefresh = (eventName, callback) => {
  useEffect(() => {
    if (!eventName || typeof callback !== "function") return;

    // Attach listener
    socket.on(eventName, () => {
      console.log(`🔔 Received real-time refresh signal: ${eventName}`);
      callback();
    });

    // Clean up on unmount
    return () => {
      socket.off(eventName);
    };
  }, [eventName, callback]);
};

export default useSocketRefresh;
