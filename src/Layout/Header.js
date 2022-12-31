import React from "react";
import { AppBar, Box, Typography, Toolbar, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';

const MyAppBar = styled(AppBar)({
  backgroundColor: "#0CC5F9", 
  padding: "8px",
  position: "static",
});

export default function Header() {


  return (
    <Box sx={{ flexGrow: 1 }}>
      <MyAppBar >
        <Toolbar >
          <Box><img src="https://static.tinytap.com/media/images/creator/assets/ui/header/logo.svg" alt='logo'/></Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Assignment Yohav Rotsztein
          </Typography>
          <MenuItem  component={"a"} target="_blank" href={"https://www.linkedin.com/in/yohav-rn-700247121/"}>Linkedin</MenuItem>
          <MenuItem  component={"a"} target="_blank" href={"https://github.com/yohavrotsztein"}>Github</MenuItem>
        </Toolbar>
      </MyAppBar>
    </Box >
  );
}
