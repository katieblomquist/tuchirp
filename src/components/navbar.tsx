import { AppBar, Container, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Button, Tooltip, Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../services/entities";

const settings = [{ title: 'Profile', link: "/profile" }, { title: 'Account', link: "/account" }, { title: 'Logout', link: "/" }];

export default function NavBar(props: { user: Profile, isPublic: boolean }) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  let initial = props.user.handle.charAt(0).toUpperCase();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  if (props.isPublic) {
    return (
      <AppBar position="static" style={{ backgroundColor: '#F5BE41', color: 'black' }}>
        <Container style={{ width: '100%', backgroundColor: '#F5BE41' }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            ><Link to={"/"}>TU CHIRP</Link>

            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Button
                variant="contained"
                style={{ backgroundColor: 'black' }}
              ><Link to={"/login"} style={{ color: 'white' }}>Login</Link></Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  } else {
    return (
      <AppBar position="static" style={{ backgroundColor: '#F5BE41', color: 'black' }}>
        <Container style={{ width: '100%', backgroundColor: '#F5BE41' }}>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'black',
                textDecoration: 'none',
              }}
            ><Link to={"/"}>TU CHIRP</Link>

            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar>{initial}</Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem component={Link} to={setting.link} key={setting.title} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
  }


}