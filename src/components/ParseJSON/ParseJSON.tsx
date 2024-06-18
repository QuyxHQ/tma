import React from 'react';
import JsonView from 'react18-json-view';
import 'react18-json-view/src/style.css';

const ParseJSON: React.FC<{ data: Object }> = ({ data }) => {
    return (
        <JsonView
            src={data}
            enableClipboard={false}
            displaySize={false}
            collapsed={true}
            style={{ lineHeight: '160%' }}
        />
    );
};

export default ParseJSON;
