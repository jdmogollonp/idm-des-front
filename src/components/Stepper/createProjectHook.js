import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import Aux from '../../hoc/_Aux';
import Request from '../../services/requests';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '../../store/projectReducer';
import { API_SERVER_PROJECTS } from '../../config/constant';

const CreateProjectHook = ({ handleNext }) => {
    const dispatcher = useDispatch();

    const { newProject } = useSelector((store) => store.project);
    const [projectName, setProjectName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [isPublic, setIsPublic] = React.useState(false);
    const [bottonIsDisable, setBottonIsDisable] = React.useState(true);

    const handleProjectCreate = (e) => {
        const data = {
            projectId: e.data.id,
            projectName: e.data.name,
            description: e.data.description,
            tags: e.data.tags,
            isPublic: e.data.isPublic
        };
        console.log(data);
        dispatcher(createProject(data));
    };

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
        handleForm();
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        handleForm();
    };

    const handleTagsChange = (e) => {
        setTags(e.target.value);
        handleForm();
    };

    const handleIsPublicChange = () => {
        setIsPublic(!isPublic);
    };

    const handleCreateFolder = (id) => {
        const request = new Request().getRequestInstance(null);
        request
            .post(API_SERVER_PROJECTS + 'folders/create_folder/', {
                project_id: id
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error.response != null ? error.response : error);
            });
    };

    const handleClick = () => {
        //const request = new Request().getRequestInstance(null, this.props.token);
        const request = new Request().getRequestInstance(null);
        request
            .post(API_SERVER_PROJECTS + 'projects/create_project/', {
                username: 'testsdf',
                name: projectName,
                description: description,
                tags: [tags],
                isPublic: isPublic
            })
            .then((response) => {
                console.log(response);
                handleCreateFolder(response.data.id);
                handleProjectCreate(response);
                handleNext();
            })
            .catch((error) => {
                console.log(error.response != null ? error.response : error);
            });
    };

    const handleForm = () => {
        if (projectName != '' && description != '' && tags != '') setBottonIsDisable(false);
        else setBottonIsDisable(true);
    };

    React.useEffect(() => {
        setProjectName(newProject.projectName);
        setDescription(newProject.description);
        setTags(newProject.tags.toString());
        setIsPublic(newProject.isPublic);
        console.log(newProject.isPublic);
    }, [newProject]);

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Create Project</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <Form>
                                        <Form.Group controlId="formProjectName">
                                            <Form.Label>Project Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Project Name"
                                                value={projectName}
                                                onChange={(e) => handleProjectNameChange(e)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formProjectDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Description"
                                                value={description}
                                                onChange={(e) => handleDescriptionChange(e)}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formTags">
                                            <Form.Label>Tags</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Tags"
                                                value={tags}
                                                onChange={(e) => handleTagsChange(e)}
                                            />
                                            <Form.Text className="text-muted">Add tags to ease finding your project later.</Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="formBasicChecbox">
                                            <Form.Check
                                                type="checkbox"
                                                label="Make this project public"
                                                checked={isPublic}
                                                onChange={() => handleIsPublicChange()}
                                            />
                                        </Form.Group>
                                        <Button variant="primary" size="lg" onClick={(e) => handleClick(e)} disabled={bottonIsDisable}>
                                            Create
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
};

export default CreateProjectHook;
