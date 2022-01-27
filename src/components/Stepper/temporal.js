import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';

import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { clearNewProject } from '../../../store/projectReducer';
import CreateProjectHook from '../../../components/Stepper/createProjectHook';
import FormsElements from '../../../components/Stepper/uploadFiles';
import Share from '../../../components/Stepper/Share';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

const steps = ['Create project', 'Upload files', 'Check data quality', 'Process data', 'Share', 'Done'];

const demos = {
    soundcloud:
        '<iframe frameborder="0" style="overflow:hidden;height:100vh ;width:100%" height="100%" width="100%" src="http://dess.work.temporal.public.s3-website-us-east-1.amazonaws.com/index.html"></iframe>',
    profile_report:
        '<iframe frameborder="0" style="overflow:hidden;height:100vh ;width:100%" height="100%" width="100%" src="https://s3.amazonaws.com/dess.work.temporal.public/profiling_report.html"></iframe>',
    sample_distribution:
        '<iframe frameborder="0" style="overflow:hidden;height:100vh ;width:100%" height="100%" width="100%" src="https://s3.amazonaws.com/dess.work.temporal.public/sample_distribution.html"></iframe>'
};

function Iframe(props) {
    return <div dangerouslySetInnerHTML={{ __html: props.iframe ? props.iframe : '' }} />;
}

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
        console.log('entro a handleNext');
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
            {activeStep === 1 ? <FormsElements></FormsElements> : ''}

            {activeStep === 2 ? (
                <div className="App">
                    <h5>Data quality report</h5>
                    <Iframe iframe={demos['soundcloud']} allow="autoplay" />,
                </div>
            ) : (
                ''
            )}
            {activeStep === 3 ? '' : ''}
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
                    The file you are trying to upload is not valid. The supported extensions is .csv. Make sure you are using the template.
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
