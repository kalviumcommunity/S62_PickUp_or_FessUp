import { useEffect, useState } from "react";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/users") // Ensure backend is running on port 5000
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("❌ Error fetching users:", error));
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.length > 0 ? (
                    users.map((user) => (
                        <li key={user.UserID}>
                            <strong>{user.Username}</strong> ({user.Email})
                        </li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

export default UserList;
