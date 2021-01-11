import { useState, useEffect } from "react";
import axios from "axios";

export default function FindPeople() {
    const [users, setUsers] = useState([]);

    function onChange(e) {
        console.log("e.target.value: ", e.target.value);
        setUsers(e.target.value);
    }

    useEffect(() => {
        let abort;
        async () => {
            const { data } = await axios.get("api/users");
            console.log("useEffect in FindPeople is running! data:", data);
            if (!abort) {
                console.log("no abort");
                setUsers(data);
            }
        };
        return () => {
            console.log("clean up running");
            abort = true;
        };
    }, []);

    return (
        <div>
            <h2>Find other people</h2>
            <input
                onChange={(e) => setUsers(e.target.value)}
                placeholder="Type a name here..."
            />
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.first}
                        {user.last}
                        {user.url}
                    </li>
                ))}
                {!users.length && <li>Nobody Found</li>}
            </ul>
        </div>
    );
}
