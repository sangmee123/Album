# Album
로그인 시 앨범집을 보여줍니다.

## 📗목차 

- 📝 [개요](#-포트폴리오-개요)
- 🔗 [링크](#-링크)
- 🛠 [사용 기술 스택](#-사용-기술-스택)
- 👤 [사용자 계정](#-사용자-계정)
  - 🎬 [회원가입 과정 시연 영상](#-회원가입)
  - 🔓 [아이디 찾기](#-아이디-찾기)
  - 🔓 [비밀번호 찾기](#-비밀번호-찾기)
- [서버 On일 때](#서버-on일-때)
  - 🌞 Light 모드 & 🌜 Dark 모드
- 🎬 [서버 Off일 때 시연 영상](#-서버-off일-때)
- 🎬 [로그인 과정 & 앨범 페이지 시연 영상](#-로그인-과정-시연-영상)
- [갤러리 페이지](#-갤러리-페이지)
  - 🌞 Light 모드 & 🌜 Dark 모드
  - 🎬 [갤러리 페이지 시연 영상](#-갤러리-페이지-시연-영상)
  
<br>

## 📝 포트폴리오 개요 

<img width="800" src="https://github.com/sangmee123/Album/assets/69633033/15fcf57d-ffcd-4a31-8385-cc8c2ff70f78">

>**프로젝트**: 추억을 로그인. 앨범집
>
>**개발 기간**: 2023. 10 ~ 2024 01.
>
>**상세 기능**:
> - `회원가입`을 통해 계정을 생성할 수 있습니다.
> - `아이디 찾기`와 `비밀번호 찾기`를 통해 본인의 계정을 찾을 수 있습니다.
> - `비밀번호 재설정`을 할 수 있습니다.
> - 로그인에 성공하면 **JWT 토큰**을 생성하여 10분 후에 **토큰 만료 알림창**이 뜹니다.(확인 버튼 누르면 로그아웃)
> - <img width="600" src="https://github.com/sangmee123/Album/assets/69633033/a233a645-2162-4b50-bfcc-2cb82ef24bd0">
> - 로그인 후 앨범집 형태의 UI를 띄는 `앨범 페이지`로 렌더링합니다.
> - 서버에서 이미지 관련 데이터를 불러왔습니다.
> - 앨범집의 **"펼쳐보기"** 버튼을 누를 시 해당 제목의 `갤러리 페이지`로 렌더링해줍니다.
> - 갤러리 페이지에 있는 이미지를 클릭하면 `해당 이미지가 확대된 페이지`로 렌더링해줍니다.
> - 이미지가 확대된 페이지에서 해당 이미지를 다운받을 수 있습니다. 

<br>

## 🔗 링크
#### 외부에서도 실행할 수 있도록 웹 호스팅을 통해 서버 구축
`테스트 아이디`: test <br>
`테스트 비밀번호`: 123 <br>
http://oeanb.dothome.co.kr <br>
<br>

## 🛠 사용 기술 스택

![TypeScript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=blue)
![Redux-Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
<br><br>
![CSS3](https://img.shields.io/badge/CSS3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=SASS&logoColor=white)
![StyledComponents](https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=Styled-components&logoColor=white)
<br><br>
![PHP](https://img.shields.io/badge/PHP-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)

<br>

## 👤 사용자 계정
### 🎬 회원가입

https://github.com/sangmee123/Album/assets/69633033/eef3cc5f-d617-4d9e-bd31-54d137cf3fb1

- 비밀번호 재확인 일치 여부 확인
- 회원가입을 하기 위해 입력한 아이디가 중복일 경우 팝업창을 띄움
- 회원가입을 하기 위해 입력한 휴대폰 번호가 중복일 경우 팝업창을 띄움
- 회원가입 성공 시 비밀번호를 해시화하여 저장(SQL 인젝션 방지)
- 서버 연결이 끊긴 경우 팝업창을 띄움
---

### 🔓 아이디 찾기

<img width="800" src="https://github.com/sangmee123/Album/assets/69633033/f1167f7d-d255-4c5d-96db-0e6e1d672fcb"><br>
<br>사용자 **이름**과 **휴대폰 번호**를 입력하여 아이디를 찾을 수 있습니다.

---

### 🔓 비밀번호 찾기
<img width="800" src="https://github.com/sangmee123/Album/assets/69633033/8ee62a7f-bf20-473c-bdb6-1849ae15e7cf"><br>
<br>사용자 **아이디**와 **휴대폰 번호**를 입력하여 비밀번호를 재설정할 수 있습니다.

<br>

## 서버 On일 때
<!-- ### 🌞 Light 모드
<p align="center">
  <img width="395" src="https://github.com/sangmee123/Album/assets/69633033/5400a9a5-55f8-40d9-b21f-0d4e5b77073d">
</p>

### 🌜 Dark 모드
<p align="center">
  <img width="395" src="https://github.com/sangmee123/Album/assets/69633033/87971c41-ee8f-49cc-a20b-85f7b8cde12f">
</p>
-->

### 🌞 Light 모드  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🌜 Dark 모드

<img width="400" src="https://github.com/sangmee123/Album/assets/69633033/5400a9a5-55f8-40d9-b21f-0d4e5b77073d">

<img width="400" src="https://github.com/sangmee123/Album/assets/69633033/87971c41-ee8f-49cc-a20b-85f7b8cde12f">
  
## 🎬 서버 Off일 때

https://github.com/sangmee123/Album/assets/69633033/cdb64f74-b931-49d2-86a8-3d3dcadcf9a5

<br>

## 🎬 로그인 과정 시연 영상

https://github.com/sangmee123/Album/assets/69633033/2fb744d0-e6dd-4040-a41e-3e6a41ffa71f

<br>

## 🎬 갤러리 페이지

### 🌞 Light 모드  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🌜 Dark 모드

<img width="400" src="https://github.com/sangmee123/Album/assets/69633033/0d87b68c-9ad4-44ee-a6cf-7d306b1b5909">
<img width="400" src="https://github.com/sangmee123/Album/assets/69633033/21d48d6c-3da4-4e99-8ca5-cdcf82b8b44e">


### 🎬 갤러리 페이지 시연 영상

https://github.com/sangmee123/Album/assets/69633033/b47f9a8e-e996-4417-8f84-24b684318d02
