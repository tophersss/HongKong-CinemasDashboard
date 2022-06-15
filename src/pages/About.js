import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';


const About = () => {
    return (
        <Box
            className='hero-banner'
            sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
            }}
        >
            <Container maxWidth="sm">
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Cinemas
                    <br />
                    Dashboard
                    <br />

                    {/* <div class="flag-outer-wrapper">
                        <a class="flag-wrapper">
                            <i id="hk-flag"/>
                        </a>
                    </div> */}
                    {/* <img id='hk-flag' src="https://flagicons.lipis.dev/flags/4x3/hk.svg"/> */}
                    {/* &nbsp;Cinemas Dashboard */}
                </Typography>
                <div className="line-separator">

                </div>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    An interactive dashboard made with real-world data to visualize cinemas' popular times, sales, and seat popularity.
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" component={Link} to="/dashboard">
                        <KeyboardArrowRightRoundedIcon />Get Started
                    </Button>
                    <Button variant="outlined" component={MuiLink} href="https://github.com/tophersss/HongKong-CinemasDashboard" target="_bank">
                        <GitHubIcon />&nbsp;View Code
                    </Button>
                    <Button variant="outlined" component={MuiLink} href="mailto:chrissssuen@gmail.com" target="_bank">
                        <MailOutlineRoundedIcon />&nbsp;Contact Me
                    </Button>
                </Stack>
            </Container>
        </Box>
    )
}

export default About