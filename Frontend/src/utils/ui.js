/**
 * PREMIUM AVATAR COLORS
 * A curated list of background colors for company initials.
 */
export const AVATAR_COLORS = [
    "bg-blue-600",
    "bg-purple-600", 
    "bg-red-600",
    "bg-green-600", 
    "bg-orange-500", 
    "bg-teal-600",
    "bg-indigo-600",
    "bg-pink-600",
    "bg-cyan-600",
    "bg-amber-600",
];

/**
 * GENERATE CONSISTENT COLOR
 * Uses a string hashing algorithm to ensure the same company always gets the same color.
 */
export const getAvatarColor = (name = "") => {
    if (!name) return AVATAR_COLORS[0];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const index = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[index];
};
