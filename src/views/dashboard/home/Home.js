import { Button, Col, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNewProject, listProjects, deleteProject } from '../../../store/projectReducer';
import Table from 'react-bootstrap/Table';
import { withRouter } from 'react-router';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

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

    const handleDeleteProject = project => {
        const confirmationSwal = withReactContent(Swal);
    
        confirmationSwal.fire({
            title: <p className='h2'>Delete project</p>,
            html: <p>Are you sure you want to delete the project {project.projectName}?</p>,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'DELETE'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatcher(deleteProject(project));
            }
        });
    }

    const handleShareProject = project => {
        const shareSwal = withReactContent(Swal);
        const projectUrl = `${document.location.href}/${project.projectId}`;
    
        shareSwal.fire({
            title: <p className='h2'>Share</p>,
            html: <p> Please enter an email to share: or copy the next link </p>,
            footer:
                <p>
                    <span className='mr-2'>{projectUrl}</span>              
                    <CopyToClipboard
                        text={projectUrl}
                        onCopy={() => {}}
                        >
                        <button
                            className='swal2-confirm swal2-styled'
                            onClick={ event => {
                                console.log(event)
                                event.target.innerHTML = 'Copied!';
                            }}
                        >
                            Copy link
                        </button>
                    </CopyToClipboard>
                </p>,
            input: 'email',
            inputPlaceholder: 'email',
            confirmButtonText: 'share'
        }).then((result) => {
            if (result.isConfirmed) {
                //dispatcher(shareProject(project));
            }
        });
    }

    const handleSearch = event => {
        dispatcher(listProjects(event.target.value));
    }   
    
    const openStatistics = project => {
        console.log(project.urlQualityProcessing);
       window.open( project.urlQualityProcessing, '_blank');
    } 
    
    const openQualityCheck = project => {
        console.log(project.urlQualityCheck);
        window.open( project.urlQualityCheck, '_blank');
    }

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Button variant="primary" size="lg" onClick={() => handleCreateNewProject()}>
                        Create Project
                    </Button>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col>
                    <InputGroup className=''>
                        <InputGroup.Text id="search-project">
                            <i className='feather icon-search'></i>
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Search"
                            aria-label="Seache"
                            aria-describedby="search-project"
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
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
                            <td>{item.projectId}</td>
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
                                <Button
                                    onClick={ () => openStatistics(item) }
                                >
                                    <i className="feather icon-download" />
                                    Quality checks
                                </Button>

                                <Button
                                    onClick={ () => openQualityCheck(item) }
                                >
                                    <i className="feather icon-download" />
                                    Statistics
                                </Button>
                            </td>
                            <td>
                                <Button onClick={() => handleShareProject(item)}>
                                    <i className="feather icon-share" />
                                    Share
                                </Button>
                            </td>
                            <td>
                                <Button onClick={() => {handleDeleteProject(item)}}>
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
