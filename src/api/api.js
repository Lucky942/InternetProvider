import * as axios from "axios";

export const getTariffs = () => {
    axios
        .get("http://localhost:1337/tariffs")
        .then(response => {
            return response.data
        })
        .catch(err => console.error(err));
};

