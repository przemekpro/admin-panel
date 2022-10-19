import { Typography } from "@mui/material";
import React from "react";


export default function Header() {
    return(
        <Typography 
            variant='h1' 
            fontSize={'2.5rem'} 
            m={'1em 0'} 
            fontWeight={600} 
            letterSpacing={'0.5px'}
        >
            Dashboard
        </Typography>
    )
}