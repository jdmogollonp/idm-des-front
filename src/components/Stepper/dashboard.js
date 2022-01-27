import React from 'react';

const Dashboard = () => {
    const iframe =
        '<iframe height="1000" style="width: 100%;" scrolling="yes" title="fx." src="http://localhost:8004/app/app1" frameborder="no" allowtransparency="true" allowfullscreen="true"</iframe>';
    function Iframe(props) {
        return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />;
    }

    return (
        <div className="App">
            <Iframe iframe={iframe} />,
        </div>
    );
};

export default Dashboard;
