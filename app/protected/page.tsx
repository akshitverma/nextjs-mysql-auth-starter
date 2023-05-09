// import SignOut from "@/components/sign-out";
// import { NextUIProvider } from '@nextui-org/react';
// import { Navbar, Button, Link, Text, Card, Radio } from "@nextui-org/react";
// import ResponsiveAppBar from "@/components/ResponsiveAppBar";

// export default function Home() {
//   return (
//     <div className="flex h-screen bg-black">
   
//       <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center">
//       <ResponsiveAppBar/>
//         <iframe
//           src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//           allowFullScreen
//           className="w-full max-w-screen-lg aspect-video"
//         ></iframe>
//         <SignOut />
//       </div>
//     </div>
//   );
// }

"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingDots from "@/components/loading-dots";
import { Session } from 'next-auth';
import { NextRequest, NextResponse } from "next/server";
import { useState } from 'react';
import {useRef} from 'react';
import SingleFileUploadForm from "@/components/SingleFileUploadForm";
import { getSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import ReactMarkdown from "react-markdown";
import styles from "@/styles/Home.module.css";


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Pyinterview
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let cards: any[] = [];
let apicalled = false;

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#999999",
    },
  },
});

export default function Album() {
  console.log("hello");
  
  const [jobs, setJobs] = React.useState(cards);
  // const [ session ] = useSession();

  const callAPI = async () => {
		try {
			const res = await fetch('https://ankitkf.ngrok.io/job_positions/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Token ' + 'bd4b2129-1e59-4501-8856-76aa28d9e504'
        }});


			const data = await res.json();
			console.log(data);
      setJobs(data.results);
		} catch (err) {
			console.log(err);
		}
	};

  const router = useRouter();

  const callStartInterviewAPI = async (jobId: string) => {
		try {
			const res = await fetch('https://ankitkf.ngrok.io/interviews/start/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + '3ab2cc5d65a28f45fb2cf5a9e38579ce67cb80ec'
        },
        body: JSON.stringify({ 
          "job_position": jobId,
          "candidate": "fddab7a2-b921-4cfe-8063-5f87600b22be"
        })
      });

			const data = await res.json();
			console.log(data);
      if (res.status === 400) {
        alert(data.detail);
      }
      else{
        alert("Starting Interview");
        router.push('protected/chat');
      }
     
      
		} catch (err) {
      alert(err);
			console.log(err);
		}
	};

  if (!apicalled) {
    apicalled = true;
    callAPI();
  }
  
  const handleStartInterview = (id: string) => {
    callStartInterviewAPI(id);
  };

  return (
    <ThemeProvider theme={theme}
    
    >
      <CssBaseline />
      <ResponsiveAppBar />
        {/* <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
        </Toolbar> */}
      
      <main>
        {/* Hero unit */}
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
              Job Listing
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Something short and leading about the collection below—its contents,
              the creator, etc. Make it short and sweet, but not too short so folks
              don&apos;t simply skip over it entirely.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <SingleFileUploadForm />
              {/* <input
        style={{display: 'none'}}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      /> */}
              {/* <Button variant="outlined" onClick={uploadResumeTapped}>Upload Resume</Button> */}
              {/* <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          {/* <Grid container spacing={12}> */}
            {jobs.map((card) => (
              // <Grid item key={card} xs={12} sm={6} md={4}>
               
               <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
              component="h1"
              variant="h5"
              align="left"
              color="text.primary"
              gutterBottom
            >{ card.title }
            </Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography variant="inherit" align="left" color="text.secondary" paragraph>
            { card.brief_description }
        </Typography>
        {/* <Typography variant="h6" align="left" color="text.primary" paragraph> */}
        <div className={styles.markdownanswer}>
            <ReactMarkdown linkTarget={"_blank"}>
            { card.full_description }
                    </ReactMarkdown>
                    </div>
        {/* </Typography> */}
          <Typography variant="h6" align="center" gutterBottom>
         .
           </Typography>
          <Button variant="outlined" onClick={() => handleStartInterview(card.uuid)}>Start Interview</Button>

        </AccordionDetails>
      </Accordion>
                
              // </Grid>
            ))}
             
          {/* </Grid> */}
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}