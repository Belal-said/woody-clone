function getStoredUser() {
    try {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) return null;

        const user = JSON.parse(storedUser);

        return user;
    } catch {
        return null;
    }
}

export default getStoredUser;