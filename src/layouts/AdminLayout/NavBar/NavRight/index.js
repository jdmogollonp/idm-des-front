import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const NavRight = () => {
    const history = useHistory();

    const handlerRemoveConfirmation = () => {
        const confirmationSwal = withReactContent(Swal);
    
        confirmationSwal.fire({
            title: <p className='h2'>Delete user</p>,
            html: <p>Are you sure you want to delete your account?</p>,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'DELETE'
        }).then((result) => {
            if (result.isConfirmed) {
                let path = '/users/delete';
                history.push(path);
            }
        });
    }

    return (
        <React.Fragment>
            <Button className="btn-danger mr-2" onClick={handlerRemoveConfirmation}>
                <i className="feather icon-trash-2" /> Remove User
            </Button>
            <Link to="/auth/logout" className="navbar-nav mr-5">
                <Button>
                    <i className="feather icon-log-out" /> LogOut
                </Button>
            </Link>
        </React.Fragment>
    );
};

export default NavRight;

