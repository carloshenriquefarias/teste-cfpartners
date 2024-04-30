import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import { Button, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {

  const githubProfileImageUrl = 'https://avatars.githubusercontent.com/u/102967835?s=400&u=deec42da6ddbfde5323ef24a49ffc6c3bc4fee42&v=4';

  const contact = [
    {
      id: '1',
      title: 'GitHub',
      description: 'To know a little more about my skill, click on button below',
      route: 'https://github.com/carloshenriquefarias', 
      logo: <Avatar src={'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png'} variant="square" />,
    },
    {
      id: '2',
      title: 'LinkedIn',
      description: 'If you want to know about my job, click on button below',
      route: 'https://www.linkedin.com/in/carlos-farias-junior-296562235/', 
      logo: <Avatar src={'https://static.vecteezy.com/ti/vetor-gratis/p3/3692704-linkedin-american-business-logo-social-media-icon-black-pictogram-vector-illustration-isolated-on-white-backgroud-gratis-vetor.jpg'} variant="square" />,
    },
  ];

  return (
    <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
        <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
          <Box sx={{ maxWidth: '450px', width: '100%' }}>{children}</Box>
        </Box>
      </Box>

      <Box
        sx={{
          alignItems: 'center',
          background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
          color: 'var(--mui-palette-common-white)',
          display: 'flex', flex: '1 1 auto', flexDirection: 'column',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Stack spacing={3} sx={{ alignItems: 'center', justifyContent: 'center', maxWidth: '500px', width: '100%' }} direction={'column'}>
          <Stack spacing={1}>
            <Typography color="inherit" sx={{ fontSize: '32px', lineHeight: '32px', textAlign: 'center' }} variant="h1">
              About the creator of this project  {' '}
            </Typography>
            
            <Typography align="center" variant="subtitle1">
              <Box 
                component="span" 
                sx={{ 
                  mt: 2, 
                  lineHeight: '1.5em', 
                  textAlign: 'center', 
                  color: '#635BFF', 
                  alignItems: 'center', 
                  display: 'flex', 
                  flex: '1 1 auto', 
                  justifyContent: 'center', 
                  p: 2
                }}                
              >   
                Hi, my name is Carlos Henrique and I am very happy to share this project with you. 
                I am a software engenier and this project I wanna show you up how works a CRUD. 
                This project was requested by CF Partners company.
              </Box> 
            </Typography>
          </Stack>

          <Card>
            <CardContent>
              <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <div>
                  <Avatar src={githubProfileImageUrl} sx={{ height: '100px', width: '100px' }} />
                </div>

                <Stack spacing={1} sx={{ textAlign: 'center' }}>
                  <Typography variant="h5">{'Carlos Henrique Farias Junior'}</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {'Software Engineer'}
                  </Typography>
                </Stack>                
              </Stack>

              <Grid container spacing={2} mt={1}>
                {contact.map((item, index) => (
                  <Grid key={index} item lg={6} md={6} xs={12}>
                    <Card 
                      sx={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        height: '100%', 
                        transition:"all 0.25s", 
                        transitionTimingFunction:"spring(1 100 10 10)", 
                        '&:hover': {transform: 'translateY(-5px)'}
                      }
                    }>
                      <CardContent sx={{ flex: '1 1 auto' }}>
                        <Stack spacing={1}>
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>                     
                            <Stack>
                              {item.logo}
                            </Stack>
                          </Box>
                          <Stack spacing={1} mb={1}>
                            <Typography align="center" variant="h5">
                              {item.title}
                            </Typography>
                            <Typography align="center" variant="body1">
                              {item.description}
                            </Typography>
                          </Stack>
                          <Button variant="contained" component="a" href={item.route} target="_blank">
                            My profile
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Stack spacing={1} mt={3} sx={{ textAlign: 'center' }}>
                <Typography color="text.secondary" variant="body2">
                  Brazil, Rondonia, Jaci Paraná, 2024
                </Typography>
              </Stack>   

            </CardContent>
          </Card>
        </Stack>        
      </Box>
    </Box>
  );
}
