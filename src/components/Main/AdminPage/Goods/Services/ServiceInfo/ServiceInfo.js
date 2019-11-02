import React from 'react';

const ServiceInfo = ({i, name, price}) => {
    return (
        <React.Fragment>

            <td>{i}</td>
            <td>{name}</td>
            <td>{price}</td>
        </React.Fragment>
    );
};

export default ServiceInfo