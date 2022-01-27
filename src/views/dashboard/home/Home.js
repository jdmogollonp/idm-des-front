import { Button } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNewProject, listProjects } from '../../../store/projectReducer';
import Table from 'react-bootstrap/Table';
import { withRouter } from 'react-router';

const Home = ({ history }) => {
    const dispatcher = useDispatch();
    const { projects } = useSelector((store) => store.project);

    function downloadURI(uri, name) {
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    React.useEffect(() => {
        dispatcher(listProjects());
    }, [dispatcher]);

    const handleCreateNewProject = () => {
        dispatcher(clearNewProject());
        history.push('/app/dashboard/projects');
    };

    return (
        <React.Fragment>
            <Button variant="primary" size="lg" onClick={() => handleCreateNewProject()}>
                Create Project
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Tags</th>
                        <th>Public</th>
                        <th>Resources</th>
                        <th>Share</th>
                        <th>Config</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((item, index) => (
                        <tr key={item.projectId}>
                            <td>{index}</td>
                            <td>{item.projectName}</td>
                            <td>{item.description}</td>
                            <td>{item.tags}</td>
                            <td>{item.isPublic ? item.isPublic.toString() : ''}</td>
                            <td>
                                <Button
                                    onClick={() =>
                                        downloadURI(
                                            'http://dess.work.temporal.public.s3-website-us-east-1.amazonaws.com/index.html',
                                            'helloWorld.txt'
                                        )
                                    }
                                >
                                    <i className="feather icon-download" />
                                    Dataset
                                </Button>
                                <Button>
                                    <i className="feather icon-download" />
                                    Quality checks
                                </Button>

                                <Button>
                                    <i className="feather icon-download" />
                                    Statistics
                                </Button>
                            </td>
                            <td>
                                <Button>
                                    <i className="feather icon-share" />
                                    Share
                                </Button>
                            </td>
                            <td>
                                <Button>
                                    <i className="feather icon-trash" />
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </React.Fragment>
    );
};

export default withRouter(Home);
