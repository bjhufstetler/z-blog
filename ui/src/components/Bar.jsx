import React from 'react';
import { AppBar, Container, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useFetch } from '../hooks';
import { useAppContext } from '../context';
import { Box } from '@mui/system';
import { useEffect } from 'react';

export const Bar = () => {
    const appContext = useAppContext();
    const { data: users } = useFetch(appContext.userURL)
    useEffect(() => {
        console.log(users)
    }, [users])
    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <Box sx={{flexGrow:0}}>
                        <IconButton>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}