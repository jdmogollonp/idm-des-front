// action - state management

const LIST_PROJECT = 'LIST_PROJECT';
const CREATE_PROJECT = 'CREATE_PROJECT';
const DELETE_PROJECT = 'DELETE_PROJECT';
const UPDATE_PROJECT_URL = 'UPDATE_PROJECT_URL';
const CLEAR_PROJECT = 'CLEAR_PROJECT';

export const initialState = {
    projects: [{}],
    newProject: {
        projectId: '',
        projectName: '',
        description: '',
        tags: '',
        isPublic: false,
        fileName: ''
    }
};

const projects = [
    {
        projectId: '1',
        projectName: 'test',
        description: 'test',
        tags: 'test',
        isPublic: 'false',
        urlOriginalFile: '',
        urlQualityCheck: 'http://www.wikipedia.com',
        qualityState: '',
        urlQualityProcessing: 'http://www.google.com'
    },
    {
        projectId: '2',
        projectName: 'test2',
        description: 'test2',
        tags: 'test2',
        isPublic: true,
        urlOriginalFile: '',
        urlQualityCheck: 'http://www.wikipedia.com',
        qualityState: '',
        urlQualityProcessing: 'http://www.google.com'
    },
    {
        projectId: '3',
        projectName: 'test3',
        description: 'test3',
        tags: 'Tag1 Tag2',
        isPublic: true,
        urlOriginalFile: '',
        urlQualityCheck: 'http://www.wikipedia.com',
        qualityState: '',
        urlQualityProcessing: 'http://www.google.com'
    },
    {
        projectId: '4',
        projectName: 'test4',
        description: 'test5',
        tags: 'Tag2 test',
        isPublic: true,
        urlOriginalFile: '',
        urlQualityCheck: 'http://www.wikipedia.com',
        qualityState: '',
        urlQualityProcessing: 'http://www.google.com'
    },

];
//-----------------------|| PROJECT REDUCER ||-----------------------//

export default function projectReducer(state = initialState, action) {
    switch (action.type) {
        case LIST_PROJECT: {
            const { searchValue } = action.payload;
            return {
                ...state,
                projects: projects.filter(project => project.tags.includes(searchValue)).slice(),
                searchValue
            };
        }
        case CREATE_PROJECT: {
            const { data } = action.payload;
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    ...data
                }
            };
        }
        case DELETE_PROJECT: {
            const { project } = action.payload;
            const index = projects.indexOf(project);
            projects.splice(index, 1);
            return {
                ...state,
                projects: projects.slice()
            };
        }
        case UPDATE_PROJECT_URL: {
            const { data } = action.payload;
            return {
                ...state,
                newProject: {
                    ...state.newProject,
                    ...data
                }
            };
        }
        case CLEAR_PROJECT: {
            return {
                ...state,
                newProject: {
                    ...initialState.newProject
                }
            };
        }
        default: {
            return { ...state };
        }
    }
}

export const listProjects = (tags = '') => (dispatch, getState) => {
    try {
        // consulto la api y retorno los datos de la lista de proyectos
        dispatch({
            type: LIST_PROJECT,
            payload: {
                searchValue: tags
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const createProject = (project) => (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_PROJECT,
            payload: {
                data: { ...project }
            }
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProject = (project) => (dispatch, getState) => {
    const { project: { searchValue } } = getState();
    try {
        dispatch({
            type: DELETE_PROJECT,
            payload: {
                project
            }
        });

        listProjects(searchValue);
    } catch (error) {
        console.log(error);
    }
};

export const clearNewProject = () => (dispatch, getState) => {
    try {
        dispatch({
            type: CLEAR_PROJECT
        });
    } catch (error) {
        console.log(error);
    }
};

export const updateFileName = (project) => (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_PROJECT_URL,
            payload: {
                data: { ...project }
            }
        });
    } catch (error) {
        console.log(error);
    }
};


