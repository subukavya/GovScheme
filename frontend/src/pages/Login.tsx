import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  CssBaseline,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/language");
  };

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg,#1b5e20,#43a047,#81c784)",
        }}
      >
        <Container maxWidth="sm">
          <Card
            elevation={8}
            sx={{
              borderRadius: 4,
              p: 2,
            }}
          >
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Avatar
                  sx={{
                    bgcolor: "green",
                    width: 60,
                    height: 60,
                  }}
                >
                  <LockOutlinedIcon />
                </Avatar>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  mt={2}
                >
                  GovScheme AI
                </Typography>

                <Typography color="gray">
                  Login to Continue
                </Typography>

                <TextField
                  margin="normal"
                  fullWidth
                  label="Email Address"
                />

                <TextField
                  margin="normal"
                  fullWidth
                  type="password"
                  label="Password"
                />

                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    bgcolor: "green",
                    py: 1.5,
                  }}
                  onClick={handleLogin}
                >
                  Login
                </Button>

                <Typography mt={2}>
                  Don't have an account?{" "}
                  <Link href="#">Register</Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}