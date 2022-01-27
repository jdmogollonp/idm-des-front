import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';

import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { clearNewProject } from '../../../store/projectReducer';
import CreateProjectHook from '../../../components/Stepper/createProjectHook';

import UploadFile from '../../../components/Stepper/uploadFiles';
import Report from '../../../components/Stepper/expectations';
import Dashboard from '../../../components/Stepper/dashboard';
import Share from '../../../components/Stepper/Share';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

const steps = ['Create project', 'Upload files', 'Check data quality', 'Process data', 'Share', 'Done'];

const HorizontalLinearStepper = ({ history }) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [nextStepButton, setNextStepButton] = React.useState(true);

    const dispatcher = useDispatch();

    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAlert, setShowAlert] = React.useState(false);
    const handleCloseAlert = () => setShowAlert(false);
    const handleShowAlert = () => setShowAlert(true);

    const handleClearForm = () => {
        handleClose();
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        dispatcher(clearNewProject());
    };

    const handleEnableNext = () => {
        setNextStepButton(false);
    };
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep === 1) {
            handleShow();
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        }
    };
    const handleReset = () => {
        history.push('app/dashboard');
        dispatcher(clearNewProject());
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            {activeStep === steps.length - 1 ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Home</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={handleNext} disabled={nextStepButton}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}

            {activeStep === 0 ? <CreateProjectHook handleNext={handleNext}></CreateProjectHook> : ''}
            {activeStep === 1 ? (
                <UploadFile handleNext={handleNext} handleEnableNext={handleEnableNext} handleShowAlert={handleShowAlert}></UploadFile>
            ) : (
                ''
            )}

            {activeStep === 2 ? <Report></Report> : ''}
            {activeStep === 3 ? <Dashboard></Dashboard> : ''}
            {activeStep === 4 ? <Share></Share> : ''}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>This action will delete the current project</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClearForm}>
                        Delete project
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showAlert} onHide={handleCloseAlert}>
                <Modal.Header closeButton>
                    <Modal.Title>Unsupported File</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    The file you are trying to upload is not valid. The supported extension is .csv. Make sure you are using the template.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAlert}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Box>
    );
};

export default withRouter(HorizontalLinearStepper);
