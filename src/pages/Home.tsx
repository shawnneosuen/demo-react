import React, {useEffect, useState} from "react";
import {Button} from "@material-ui/core";

const apiUrl = "localhost:9090"
export const Home = () => {

    const [param, setParam] = useState({
        name: '',
        personId: '',
    });

    const [list, setList] = useState([]);
    const [users, setUsers] = useState([]);

    // const debouncedParam = useDebounce(param, 2000)
    const request = () => {
        fetch(
            `http://${apiUrl}`,{ mode: 'no-cors'}
        )
    }

    // useMount(() => {
    //     fetch(`${apiUrl}/users`).then(async (response) => {
    //         if (response.ok) {
    //             setUsers(await response.json());
    //         }
    //     });
    // });


    return <div>
        <h1>Home</h1>
        <Button onClick={(evt) =>
           request()}>Test Request</Button>
    </div>
}


export default Home;
