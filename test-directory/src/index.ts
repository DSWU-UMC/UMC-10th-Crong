import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import { RegisterRoutes } from "./generated/routes.js";

import swaggerUi from "swagger-ui-express";
// ESM 환경에서는 JSON 파일을 가져올 때 아래와 같이 처리합니다.
import path from "path";
import fs from "fs";
import passport from "passport";
import { googleStrategy, jwtStrategy } from "./auth.config.js";

// 1. 환경 변수 설정
dotenv.config();

passport.use(googleStrategy);
passport.use(jwtStrategy);

const app: Express = express();
const port = process.env.PORT || 3000;

// 2. 미들웨어 설정
app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함(JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.use(passport.initialize());

// Express.js에 생성한 엔드 포인트들을 register
const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", router);

// 4. 서버 시작
app.listen(port, () => {
  console.log(`[server]: Server is running at <http://localhost>:${port}`);
});

// 1. TSOA가 생성한 swagger.json 읽어오기
const swaggerFile = JSON.parse(fs.readFileSync(path.resolve("dist/swagger.json"), "utf8"));

// 2. Swagger UI 연결
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/oauth2/login/google", passport.authenticate("google", { session: false }));
app.get("/oauth2/callback/google", passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }), (req, res) => {
  res.status(200).json({ success: true, tokens: req.user });
});

const isLogin = passport.authenticate("jwt", { session: false });

app.get("/mypage", isLogin, (req, res) => {
  res.status(200).json({
    message: `인증 성공! ${req.user?.email}님의 마이페이지입니다.`,
    user: req.user,
  });
});
