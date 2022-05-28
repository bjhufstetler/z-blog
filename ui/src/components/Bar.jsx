import React from 'react';
import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/system';

export const Bar = () => {
    const users = [
        {id: 1, first: 'A', last: 'Aardvark', username: 'aaa', password: '$2a$10$nuVbHXPE7zCqUp5cyK25AO2g2Uc6KPFkHMjHHhrAaf6Z6W2829mFa', salt: '$2a$10$nuVbHXPE7zCqUp5cyK25AO'},
        {id: 2, first: 'B', last: 'Blue', username: 'bluebilly', password: '$2a$10$nuVbHXPE7zCqUp5cyK25AO2g2Uc6KPFkHMjHHhrAaf6Z6W2829mFa', salt: '$2a$10$nuVbHXPE7zCqUp5cyK25AO'},
        {id: 3, first: 'C', last: 'Carlson', username: 'carl2carl', password: '$2a$10$nuVbHXPE7zCqUp5cyK25AO2g2Uc6KPFkHMjHHhrAaf6Z6W2829mFa', salt: '$2a$10$nuVbHXPE7zCqUp5cyK25AO'}
      ]

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <Box sx={{flexGrow:0}}>
                        <IconButton>
                            <MenuIcon />
                        </IconButton>
                        {users.map((user, index) => {
                                return(<Typography key={index}>{user.first}</Typography>)
                            })}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}