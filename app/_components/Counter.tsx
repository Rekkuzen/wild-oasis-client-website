"use client";

import { useState } from "react";

type CounterPropType = {
    users: any[];
};

const Counter = ({ users }: CounterPropType) => {
    const [count, setCount] = useState(0);

    console.log(users);

    return (
        <div>
            <p>There are {users.length} users.</p>
            <button onClick={() => setCount((count) => count + 1)}>
                {count}
            </button>
        </div>
    );
};

export default Counter;
