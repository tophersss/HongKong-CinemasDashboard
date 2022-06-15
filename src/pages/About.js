import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GitHub from '@mui/icons-material/GitHub';

const About = () => {
    return (
        <Box
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
                    <br/>
                    Dashboard
                    <br/>
                    
                    <div class="flag-outer-wrapper">
                        <a class="flag-wrapper">
                            <i id="hk-flag"/>
                        </a>
                    </div>
                    {/* <img id='hk-flag' src="https://flagicons.lipis.dev/flags/4x3/hk.svg"/> */}
                    {/* &nbsp;Cinemas Dashboard */}
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    An interactive dashboard made with real-world data to visualize cinemas' popular times, sales, and seat popularity.
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained">Get Started</Button>
                    <Button variant="outlined">{<> <GitHubIcon/>&nbsp;View Code</>}</Button>
                    <Button variant="outlined">Contact Me</Button>
                </Stack>
            </Container>
        </Box>
    )
}

export default About