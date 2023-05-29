// import * as React from 'react';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    bgcolor: 'background.paper',
    //   border: '2px solid #000',
    borderRadius: "1vw",
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // useEffect(() => {
    //     if (props.open === true) 
    //     {
    //         setTimeout(
    //             function () {
    //                 window.location.href = "./"
    //             }.bind(this),
    //             1000
    //         );
    //     }            
    // }, [props.open]);

    return (
        <div>
            <Modal
                open={props.open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" style={{ display: "flex", justifyContent: "center" }}>
                        <img width="96" height="96" src="https://img.icons8.com/windows/96/18E84E/verified-badge.png" alt="verified-badge" />
                    </Typography>
                    <Typography id="modal-modal-description" variant='subtitle1' sx={{ mt: 2, display: "flex", justifyContent: "center", fontWeight: "bold" }}>
                        Item Added To Cart!
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}