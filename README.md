# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

1) Clone the repo.
2) In the project folder, run command - npm install.
3) run command - npm run dev.


This is an Computerized Adaptive Test platform, that allows users to take test on basic questions from Standard 7th to 9th Mathematics.
Computerized Adaptive Testing (CAT) is a method of administering tests that adapts to the examinee's ability level in real-time.
It is designed to efficiently and accurately measure an individual's knowledge, skills, or abilities by tailoring the difficulty of the questions based on the examinee's responses.

Each new question that appears in the test is dependent on the response of previous answered question.
1) If the test taker answers current question correctly, next question will be of same or higher difficulty.
2) If the test taker answers current question incorrectly, next question will be of lower difficulty.
3) This way the test adapts itself to the test takers ability.

RESULTS: 
1) The questions asked in the test will be shown in category of ranging difficulty, to assess percentage of questions asked for each difficulty.
2) Test percentage will be shown, 70% and above stand for PASS.
3) Correct questions out of Total Questions will be shown.
4) Test metadata information will be shown.
