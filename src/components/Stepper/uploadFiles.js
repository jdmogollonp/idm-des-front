import { Row, Col, Card, Form, InputGroup, Spinner } from 'react-bootstrap';
import { API_SERVER_PROCESSING } from '../../config/constant';

import React, { useState, useContext } from 'react';
import { useDispatch, useSelector, ReactReduxContext } from 'react-redux';

import { uploadFile } from 'react-s3';
import Request from '../../services/requests';

import { updateFileName } from '../../store/projectReducer';
import {} from 'react-redux';

//require('dotenv').config();

const S3_BUCKET = 'idmprojects';
const ACCESS_KEY = '';
const SECRET_ACCESS_KEY = '';
const REGION = 'us-east-1';
const config = {
    bucketName: S3_BUCKET,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
    region: REGION
};

const UploadFile = ({ handleNext, handleEnableNext, handleShowAlert }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const { newProject } = useSelector((store) => store.project);

    const dispatcher = useDispatch();

    const handleProjectUpdateUrl = (filename) => {
        const data = {
            fileName: filename
        };
        dispatcher(updateFileName(data));
    };

    const handleUpload = async (file) => {
        uploadFile(file, config)
            .then((data) => console.log(data))
            .then(
                setTimeout(() => {
                    handleProjectUpdateUrl(file.name);
                    handleDataProcessing(file.name);
                    handleNext();
                }, 10000)
            )
            .then(
                setTimeout(() => {
                    handleBuildReport(file.name);
                }, 12000)
            )
            .then(
                setTimeout(() => {
                    handleBuildDashboard(file.name);
                }, 20000)
            )
            .catch((err) => console.error(err));
    };

    const handleBuildDashboard = (filename) => {
        const request = new Request().getRequestInstance(null);
        request
            .post(API_SERVER_PROCESSING + 'process_dashboard/', {
                bucket: S3_BUCKET,
                filename: filename
            })
            .then((response) => {
                console.log(response);
                console.log('The Dashboard has been created');
            })
            .catch((error) => {
                console.log(error.response != null ? error.response : error);
            });
    };

    const handleBuildReport = (filename) => {
        const request = new Request().getRequestInstance(null);
        request
            .post(API_SERVER_PROCESSING + 'generate_report/', {
                bucket: S3_BUCKET,
                filename: filename
            })
            .then((response) => {
                console.log(response);
                console.log('The Report has been created');
            })
            .catch((error) => {
                console.log(error.response != null ? error.response : error);
            });
    };

    const handleDataProcessing = (filename) => {
        console.log('Creating quality checks');
        console.log(filename);
        filename = String(filename);
        const request = new Request().getRequestInstance(null);
        request
            .post(API_SERVER_PROCESSING + 'process_data/', {
                bucket: S3_BUCKET,
                filename: String(filename)
            })
            .then((response) => {
                console.log(response);
                console.log('The data has been uploaded');
            })
            .catch((error) => {
                console.log(error.response != null ? error.response : error);
            });
    };

    const handleFileInput = async (file) => {
        setSelectedFile(file.target.files);
        if (selectedFile) {
            const fileExtension = selectedFile[0].name.split('.').pop();
            const array_extensions = ['csv', ' csv', ' csv ', 'csv ', 'xls', 'xlx', 'txt'];
            if (array_extensions.includes(fileExtension)) {
                handleProjectUpdateUrl(file.name);
                handleUpload(selectedFile[0]);
            } else handleShowAlert();
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Upload Resources </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <hr />
                                    <InputGroup className="mb-3">
                                        <div className="custom-file">
                                            <Form.Control
                                                aria-describedby="custom-addons5"
                                                type="file"
                                                className="custom-file-input"
                                                id="validatedCustomFile1"
                                                onChange={handleFileInput}
                                            />
                                            <Form.Label className="custom-file-label" htmlFor="validatedCustomFile1">
                                                Choose file
                                            </Form.Label>
                                        </div>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default UploadFile;
