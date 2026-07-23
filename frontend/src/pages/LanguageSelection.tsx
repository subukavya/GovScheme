import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { Language } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTranslation } from "react-i18next";
const languages = [
  { name: "English", emoji: "🇬🇧" },
  { name: "हिन्दी", emoji: "🇮🇳" },
  { name: "தமிழ்", emoji: "🇮🇳" },
  { name: "తెలుగు", emoji: "🇮🇳" },
  { name: "ಕನ್ನಡ", emoji: "🇮🇳" },
  { name: "മലയാളം", emoji: "🇮🇳" },
];

export default function LanguageSelection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const { i18n } = useTranslation();
  // Get setLanguage from Context
  const { setLanguage } = useLanguage();

  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#1b5e20,#43a047,#81c784)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="md">
          <Card
            sx={{
              p: 4,
              borderRadius: 4,
            }}
          >
            <Box textAlign="center" mb={4}>
              <Language
                sx={{
                  fontSize: 60,
                  color: "green",
                }}
              />

              <Typography variant="h4" fontWeight="bold">
                Select Your Language
              </Typography>

              <Typography color="text.secondary">
                Choose your preferred language to continue
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {languages.map((lang) => (
                <Grid item xs={12} sm={6} md={4} key={lang.name}>
                  <Card
                    sx={{
                      border:
                        selected === lang.name
                          ? "3px solid green"
                          : "1px solid #ddd",
                    }}
                  >
                    <CardActionArea
  onClick={() => {
    setSelected(lang.name);
    setLanguage(lang.name);
    i18n.changeLanguage(lang.name);
  }}
>
                      <CardContent
                        sx={{
                          textAlign: "center",
                          py: 4,
                        }}
                      >
                        <Typography fontSize={40}>
                          {lang.emoji}
                        </Typography>

                        <Typography variant="h6">
                          {lang.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box textAlign="center" mt={5}>
              <Button
                variant="contained"
                size="large"
                disabled={!selected}
                onClick={() => navigate("/profile-method")}
                sx={{
                  px: 6,
                  py: 1.5,
                  bgcolor: "green",
                }}
              >
                Continue
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
}