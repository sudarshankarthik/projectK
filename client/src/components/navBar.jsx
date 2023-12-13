import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Search, DarkMode, LightMode, Close, Menu } from "@mui/icons-material";
import FlexBetween from "./flexBetween";
import { userActions } from "store/user-slice";

const NavBar = () => {
  const [mobileMenue, setMobileMenue] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobileScreen = !useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  const fullName = `${user.firstName} ${user.lastName}`
  // const fullName = "Example User";

  return (
    <FlexBetween backgroundColor={theme.palette.accent.main} padding="1rem">
      <FlexBetween gap="2rem">
        <Typography
          fontWeight="bold"
          fontSize="1.7rem"
          color={theme.palette.background.main}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          ProjectK
        </Typography>
        {!isMobileScreen && (
          <FlexBetween
            backgroundColor={theme.palette.primary.main}
            borderRadius="1rem"
            padding="0.1rem 1.5rem"
          >
            <IconButton>
              <Search />
            </IconButton>
            <InputBase placeholder="Search" />
          </FlexBetween>
        )}
      </FlexBetween>

      {!isMobileScreen ? (
        <FlexBetween gap="2rem">
          <IconButton
            onClick={() => {
              dispatch(userActions.setMode());
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode
                sx={{ fontSize: "25px", color: theme.palette.background.main }}
              />
            )}
          </IconButton>

          <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(userActions.logout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>


        </FlexBetween>
      ) :(
        <IconButton
          onClick={() => setMobileMenue(!mobileMenue)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {mobileMenue && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor= {theme.palette.accent.main}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setMobileMenue(!mobileMenue)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(userActions.setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: theme.palette.background.main, fontSize: "25px" }} />
              )}
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: theme.palette.primary.main,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(userActions.logout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default NavBar;
