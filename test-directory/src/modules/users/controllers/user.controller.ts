import { Body, Controller, Post, Route, Tags, Response } from "tsoa";
import { UserSignUpRequest, UserResponse } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

@Route("users") // 라우트 경로
@Tags("Users") // Swagger 태그
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 회원가입을 처리하는 엔드포인트입니다.
   */
  @Post("signup") // 엔드포인드 정의
  public async handleUserSignUp(@Body() body: UserSignUpRequest): Promise<UserResponse> {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", body);
    const user = await userSignUp(body); //서비스 로직 호출
    return user; //성공 응답 보내기
  }
}
