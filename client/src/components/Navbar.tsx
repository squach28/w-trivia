import { AppBar, Box, IconButton, Typography } from "@mui/material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Link } from "@tanstack/react-router";
const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        component="nav"
        position="static"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1.5,
        }}
      >
        <Link to="/" className="text-2xl">
          w-trivia
        </Link>
        <StreakButton />
      </AppBar>
    </Box>
  );
};

export const StreakButton = () => {
  return (
    <IconButton sx={{ p: 0.5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.5,
          backgroundColor: "white",
          borderRadius: "25px",
          px: 1,
          py: 0.5,
        }}
      >
        <LocalFireDepartmentIcon color="error" />
        <Typography variant="h6" sx={{ color: "black" }}>
          0
        </Typography>
      </Box>
    </IconButton>
  );
};
export default Navbar;
