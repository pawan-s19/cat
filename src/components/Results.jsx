import { Box, Divider, Chip, Container, Grid, Typography } from "@mui/material";
import DrawerAppBar from "./AppBar";
import { useNavigate, useParams } from "react-router-dom";
import LinearProgressWithLabel from "./Progress";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import { fetchResult } from "../services/quiz";
import { useQuery } from "@tanstack/react-query";
import { getTimeDifferenceInMinutes } from "../utils/testSession";
import BackDropLoader from "./BackDropLoader";

export default function Results() {
  const navigate = useNavigate();
  const sessionId = useParams(({ sessionId }) => sessionId);

  const { data, isPending } = useQuery({
    queryKey: ["sessionResult"],
    queryFn: async () => {
      try {
        const { data } = await fetchResult(sessionId);
        console.log(data);
        return data;
      } catch (err) {
        return err;
      }
    },
  });
  return (
    <div>
      <DrawerAppBar inResults={true} />
      <Container>
        <Box
          px={2}
          sx={{ bgcolor: "whitesmoke", height: "80vh", width: "97vw" }}
        >
          <Grid container spacing={2}>
            <Grid item>
              <Box
                p={2}
                sx={{
                  height: "40vh",
                  backgroundColor: "white",
                  width: "30vw",
                }}
              >
                <Typography pt={2} variant="h5">
                  Skill Test
                </Typography>
                <Divider />
                <Box ml={5} mt={4} sx={{ display: "flex", gap: 3 }}>
                  <Box
                    p={2}
                    py={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      borderRadius: "5px",
                      width: "10rem",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                  >
                    <Typography>Questions</Typography>
                    <Typography fontWeight={"bold"}>
                      {data?.result?.questions}
                    </Typography>
                  </Box>
                  <Box
                    p={2}
                    py={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "10.5rem",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      borderRadius: "5px",
                    }}
                  >
                    <Typography>Start Date</Typography>
                    <Typography fontWeight={"bold"}>
                      {new Date().toDateString(data?.result?.startDate)},
                    </Typography>
                    <Typography fontWeight={"bold"}>
                      {new Date(data?.result?.startDate).toLocaleTimeString(
                        "en-US"
                      )}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item>
              <Box
                p={2}
                sx={{
                  height: "75vh",
                  backgroundColor: "white",
                  width: "60vw",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography fontWeight="bold" variant="h6">
                    Result
                  </Typography>
                </Box>
                <Box
                  mt={2}
                  p={2}
                  sx={{ border: "1px solid lightgrey", borderRadius: "6px" }}
                >
                  <Typography fontWeight={"bold"} variant="body1">
                    Total Score
                  </Typography>
                  <Box mt={3} sx={{ display: "flex", gap: 15 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Score</Typography>
                      <Typography variant="h5" fontWeight={"bold"}>
                        {data?.result?.answeredCorrect}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Percentage Score</Typography>
                      <Typography variant="h5" fontWeight={"bold"}>
                        {Math.round(data?.result?.percentage)}%
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Completion Time</Typography>
                      <Typography variant="h5" fontWeight={"bold"}>
                        {Math.round(
                          getTimeDifferenceInMinutes(
                            new Date(data?.result?.startDate),
                            new Date()
                          )
                        )}{" "}
                        Minutes
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box
                    mt={3}
                    p={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      border: "1px solid lightgrey",
                      borderRadius: "6px",
                      width: "25vw",
                    }}
                  >
                    <Typography fontWeight={"bold"} variant="body1">
                      Difficulty adjusted to your ability
                    </Typography>

                    {data?.result?.difficultySplit?.map((e) => (
                      <LinearProgressWithLabel
                        key={e?.label}
                        difficulty={e?.label}
                        value={e?.per}
                      />
                    ))}
                  </Box>
                  <Box
                    mt={3}
                    p={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      border: "1px solid lightgrey",
                      borderRadius: "6px",
                      width: "30vw",
                      backgroundColor: "#F5F8FB",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <SettingsSuggestIcon />
                      <Typography fontWeight={"bold"} variant="body1">
                        Summary
                      </Typography>
                    </Box>
                    <Typography>
                      Your current skill level indicates a need for significant
                      development in the assessed areas. However, with dedicated
                      effort and additional learning, the knowledge gap can be
                      filled.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {isPending ? <BackDropLoader /> : null}
    </div>
  );
}
