import { AppBar, Box, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar component="nav" position="static" sx={{ p: 1 }}>
        <Typography variant="h5">w-trivia</Typography>
      </AppBar>
    </Box>
  );
};

export default Navbar;
