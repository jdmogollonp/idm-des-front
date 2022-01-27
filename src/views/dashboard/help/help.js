import React from 'react';
import { Button } from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';

const Help = () => {
    function downloadURI(uri, name) {
        var link = document.createElement('a');
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    return (
        <React.Fragment>
            <h4>Reference Manual</h4>
            <Accordion>
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="panel-header"> Introduction</Accordion.Header>
                    <Accordion.Body className="panel-body">
                        Discrete Event Simulation (DES) is a powerful tool that relies on high-quality input data to produce good results.
                        The data should be previously managed in a complete process of preparation and adaptation to the simulation model
                        known as Input Data Management (IDM), it embraces transforming raw data into a quality-assured statistical
                        representation and integrating it into the simulation software. Automating in the right manner IDM contributes to
                        the efficiency of DES projects.
                        <Button
                            onClick={() =>
                                downloadURI(
                                    'http://dess.work.temporal.public.s3-website-us-east-1.amazonaws.com/index.html',
                                    'helloWorld.txt'
                                )
                            }
                        >
                            <i className="feather icon-download" />
                            User Manual
                        </Button>
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header className="panel-header">Upload your data</Accordion.Header>
                    <Accordion.Body className="panel-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header className="panel-header">Data unit testing with Great Expectations</Accordion.Header>
                    <Accordion.Body className="panel-body">
                        Data-related projects usually involve data transformation and processing. These stages are becoming more and more
                        relevant as they are fundamental for the construction and evaluation of models. In recent years in the area of
                        monitoring systems based on machine learning has emerged a need to monitor, among others, the behavior of variables
                        using software engineering methods using unit testing. The latter refers to the method of verifying the correct
                        functioning or definition of an element within a system. Intuitively, a "unit" can be understood as the smallest
                        part that can be tested within an application. In object-oriented programming, this can refer to testing a function,
                        a class or a method, as well as the output of a function. In our case, it refers to validating the characteristics
                        of the data set. The benefits of implementing them are evident. It is possible to detect problems in the data in a
                        preventive manner, it also allows better structuring of the code, monitoring changes quickly, and mainly provides
                        security and confidence that the results obtained are based on data that were previously tested. Each project may be
                        necessary to validate different characteristics such as missing values, number of duplicates, ranges, dimensions of
                        the arrays used, and the functions that operate on the data. These problems are frequent and affect the estimations
                        and models made from the data. Unit tests are introduced in the IDM for DES in this project, using the Python Great
                        Expectations (GE) library. This library allows validating, documenting, and profiling the input data while ensuring
                        that the data follows the expectations. This tool makes it easy to generate unit tests, validate them and generate a
                        report with the validation results, making it very easy to identify on time if the input data is appropriate to
                        build statistics and analysis from it. The ideal is to define a gap to determine if our data satisfies a certain
                        percentage of the tests, known as "coverage". It is possible to determine at what level of coverage our data is, for
                        example, we can determine that the data exceeds 80\% of the tests. If the threshold value is not met, it is
                        recommended not to continue processing and return to review the data.
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                    <Accordion.Header className="panel-header">FAQs</Accordion.Header>
                    <Accordion.Body className="panel-body">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        <Button
                            onClick={() =>
                                downloadURI('https://idmprojects.s3.amazonaws.com/sample_data/validation_data.csv', 'helloWorld.txt')
                            }
                        >
                            <i className="feather icon-download" />
                            Sample Dataset
                        </Button>
                        <div id="iframe-wrapper" style={{ display: 'flex', justifyContent: 'center', height: '50vh' }}>
                            <iframe
                                width="560"
                                height="315"
                                //src="https://www.youtube.com/embed/GG7fLOmlhYg"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </React.Fragment>
    );
};

export default Help;
