import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Button,
  TextField,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import profilePic from "../assets/profile.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    location: "",
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // ✅ Fetch current logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://excel-analytics-2.onrender.com/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data;
        setFormData({
          name: user.name || "",
          email: user.email || "",
          role: user.role || "",
          location: user.location || "",
        });
      } catch (err) {
        toast.error("❌ Failed to fetch user");
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("https://excel-analytics-2.onrender.com/api/user/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("✅ Profile updated!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("❌ Update failed");
    }
  };

  return (
    <Box sx={{ padding: isMobile ? 2 : 4 }}>
      {/* Top Card */}
      <Card
        sx={{
          padding: isMobile ? 2 : 3,
          backgroundColor: "#1F1D2B",
          color: "white",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={profilePic}
            alt="Profile"
            style={{
              width: isMobile ? 60 : 80,
              height: isMobile ? 60 : 80,
              borderRadius: "50%",
            }}
          />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {formData.name || "Loading..."}
            </Typography>
            <Typography variant="body2" sx={{ color: "gray" }}>
              {formData.email}
            </Typography>
          </Box>
        </Stack>

        <Stack
          direction={isMobile ? "column" : "row"}
          spacing={2}
          mt={isMobile ? 2 : 0}
        >
          <Button variant="contained" color="primary" fullWidth={isMobile}>
            Overview
          </Button>
          <Button variant="outlined" color="primary" fullWidth={isMobile}>
            Edit Profile
          </Button>
        </Stack>
      </Card>

      {/* Info + Form */}
      <Stack
        direction={isMobile ? "column" : "row"}
        spacing={2}
        mt={4}
        alignItems="stretch"
      >
        {/* Left Info Card */}
        <Card
          sx={{
            px: 3,
            py: 4,
            backgroundColor: "rgba(40, 43, 228, 0.75)",
            color: "white",
            width: isMobile ? "100%" : "30%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              Personal Information
            </Typography>
            <Typography>
              <strong>Name:</strong> {formData.name}
            </Typography>
            <Typography>
              <strong>Email:</strong> {formData.email}
            </Typography>
            <Typography>
              <strong>Role:</strong> {formData.role}
            </Typography>
            <Typography>
              <strong>Location:</strong> {formData.location}
            </Typography>
          </Box>

          <Button
            variant="text"
            endIcon={<ArrowForwardIcon />}
            sx={{ color: "white", mt: 5, pl: 0 }}
            onClick={() => navigate("/dashboard")}
          >
            Tap to Dashboard
          </Button>
        </Card>

        {/* Right Form */}
        <Card
          sx={{
            flex: 2,
            backgroundColor: "rgba(40, 43, 228, 0.75)",
            color: "white",
            padding: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: isMobile ? "100%" : "auto",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Edit Personal Information
          </Typography>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            <TextField
              label="Name"
              name="name"
              variant="filled"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />

            <TextField
              label="Email"
              name="email"
              variant="filled"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              disabled // 🔒 Don't allow changing email
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />

            <TextField
              label="Role"
              name="role"
              variant="filled"
              value={formData.role}
              onChange={handleChange}
              fullWidth
                disabled
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />

            <TextField
              label="Location"
              name="location"
              variant="filled"
              value={formData.location}
              onChange={handleChange}
              fullWidth
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ alignSelf: isMobile ? "stretch" : "flex-start", mt: 2 }}
            >
              Save Changes
            </Button>
          </form>
        </Card>
      </Stack>
    </Box>
  );
};

export default ProfilePage;
