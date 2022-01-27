import { Button } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNewProject, listProjects } from '../../store/projectReducer';
import Table from 'react-bootstrap/Table';

const Share = () => {
    const dispatcher = useDispatch();
    const { newProject } = useSelector((store) => store.project);

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

    return (
        <React.Fragment>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Tags</th>
                        <th>Public</th>
                        <th>Share</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{newProject.projectName}</td>
                        <td>{newProject.description}</td>
                        <td>{newProject.tags}</td>
                        <td>{newProject.isPublic ? newProject.isPublic.toString() : ''}</td>
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
                                Statistics Report
                            </Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </React.Fragment>
    );
};

export default Share;
