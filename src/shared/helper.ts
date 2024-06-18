export function getAvatar(pfp: string | null, username: string) {
    if (pfp) return pfp;
    return `https://api.dicebear.com/8.x/adventurer-neutral/svg?seed=${username}`;
}
