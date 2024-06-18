import React from 'react';

const ParseJSON: React.FC<{ data: Record<string, string> }> = ({ data }) => {
    return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default ParseJSON;
