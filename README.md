# Grea+ Front-End

## 구현 요구 사항

### 1. Auth

- **회원 가입**
  - [ ] SNS 로그인을 구현합니다.
  - [ ] 홈페이지 가입을 구현합니다.
    - 홈페이지 가입은 다음과 같은 조건을 만족합니다.
    - [ ] 이름(닉네임)은 중복 확인을 해야합니다.
    - [ ] 비밀번호 조건을 만족해야 합니다. → regExp를 통해 적용
    - [ ] 인증메일 발송과 인증 후 절차가 이루어져야 합니다.
  ***
  위 3가지 조건 중 한개라도 false가 되는 순간에 과목 칸은 사라집니다. SNS의 경우 인증이 완료되면 과목칸이 생성됩니다.
  - [ ] 과목 선택칸이 생성됩니다.
- **로그인**
  - [ ] 로그인 실패시 아이디와 비밀번호 input이 초기화 됩니다.
  - [ ] 로그인 성공시 토큰을 발행합니다.

### Main Page

- 네비게이션 Bar
  - [ ] 학생 관리기능과 시험 페이지로 이동
- 학생 관리 기능
  - [ ] 신규 학생 추가가 가능합니다.
  - [ ] 현재 학생 삭제가 가능합니다. (삭제는 table에 있는 column에 삭제 버튼을 사용합니다.)
  - [ ] 표에는 이름, 학년, 선택과목, 학생 삭제 기능이 표시됩니다.
  - [ ] 학생 이름 검색이 가능합니다.
- 학생 성적 관리 기능
  - [ ] 학생 기본 인적사항이 나타납니다. (입력 받은 값들만)
  - [ ] 학생 성적이 그래프로 표시됩니다.
    - 전국 모의고사
  - [ ] 학생 성적 입력 가능 → 학생 이름, 과목, 시험 선택
  - [ ] 모의고사 그래프에 나타나는 정보는 exam table에 있는 정보
- 시험 목록 기능
  - [ ] DB에 등록되어 있는 시험 목록이 table로 주어집니다.
- 성적 페이지 → 모의고사 기준으로 학생들의 성적이 나타나는 페이지
  - [ ] 모의고사 기준 성적 그래프가 나타남.
  - [ ] 해당 시험을 본 학생들 성적이 나타남.
  - [ ] 학생 이름 구현이 가능하다.
- 마이페이지
  - [ ] 닉네임 변경
  - [ ] 비밀번호 변경
- 구현 컴포넌트
  - [ ] 모달창 구현
  - [ ] 그래프 구현
  - [ ] 테이블 구현
