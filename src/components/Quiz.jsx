import { Box, Button, Chip, Container, Grid, Typography } from "@mui/material";
import DrawerAppBar from "./AppBar";
import { fetchQuestion } from "../services/quiz";
import { useEffect, useState } from "react";
import { getSessionId, isCorrect } from "../utils/testSession";
import { toast } from "react-toastify";
import TaskIcon from "@mui/icons-material/Task";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Quiz() {
  const navigate = useNavigate();
  const [correct, setCorrect] = useState(0);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(0);
  const [testComplete, setTestComplete] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(0);

  const fetchNextQuestion = async () => {
    try {
      const sessionId = getSessionId();
      const { data } = await fetchQuestion({
        correct: isCorrect(selected, correct),
        currQuestionId: question?._id,
        sessionId,
      });
      if (data.testCompleted) {
        setTestComplete(true);
        return toast.success(
          "Assessment completed !, Please click SUBMIT to submit the assessment"
        );
      } else {
        setQuestion(data?.question);
        setCorrect(data?.question?.correctOption);
        setQuestionNumber((number) => number + 1);
      }
      return data;
    } catch (err) {
      return err;
    }
  };

  const submitAssessment = () => {
    const sessionId = localStorage.getItem("sessionId");
    localStorage.removeItem("sessionId");
    navigate(`/results/${sessionId}`);
  };

  useEffect(() => {
    fetchNextQuestion();
  }, []);

  return (
    <div>
      <DrawerAppBar
        submitAssessment={submitAssessment}
        testCompleted={testComplete}
      />
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
                  width: "20vw",
                }}
              >
                <Chip label="How the test works ?" color="primary" />
                <Typography pt={2}>
                  Computerized Adaptive Testing (CAT) is an advanced method of
                  administering tests that adapts to the examinee's ability
                  level in real-time. This approach tailors the difficulty of
                  questions based on the examinee's performance on previous
                  questions, providing a more efficient and precise measurement
                  of their abilities.
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              {testComplete ? (
                <Box
                  sx={{
                    height: "70vh",
                    width: "70vw",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TaskIcon sx={{ fontSize: "2rem" }} />
                  <Typography variant="h6">Assessment Completed</Typography>
                </Box>
              ) : (
                <Box
                  p={2}
                  sx={{
                    height: "70vh",
                    backgroundColor: "white",
                    width: "70vw",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography fontWeight="bold" variant="h6">
                      Question {questionNumber}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Chip label={question?.tag} color="success" />
                      <Typography variant="subtitle2" color="gray">
                        {question?.point} Point
                      </Typography>
                    </Box>
                  </Box>
                  <Typography py={2} variant="body1">
                    {question?.text}
                  </Typography>
                  <Typography pb={2} variant="body1">
                    Answer
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      minHeight: "40vh",
                    }}
                  >
                    {question?.options?.map((dets, i) => (
                      <Button
                        onClick={() => setSelected(i + 1)}
                        key={i}
                        sx={{
                          width: "50vw",
                          border: "1px solid #454545",
                          borderRadius: "10px",
                          textTransform: "none",
                          justifyContent: "flex-start",
                          padding: "10px",
                          backgroundColor:
                            i + 1 === selected ? "#B9D9EB" : "none",
                        }}
                      >
                        <Typography color="#454545">{dets}</Typography>
                      </Button>
                    ))}
                  </Box>
                  <Button
                    onClick={() => {
                      fetchNextQuestion();
                      setSelected(0);
                    }}
                    disabled={!selected}
                    variant="contained"
                  >
                    Next Question
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
