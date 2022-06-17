
# 기록의 달인 : GIDAL

2022 경기대학교 컴퓨터공학심화캡스톤 목123 6조

https://www.youtube.com/watch?v=aWmifIxTD5U

차세대 일기 작성 애플리케이션 : Next Generation Diary Writing Application


## Authors
- [@gabrielyoon7 (윤주현, Gabriel Ju Hyun Yoon)](https://github.com/gabrielyoon7)
- [@gykim0923 (김가영)](https://github.com/gykim0923)
- [@SeonaePark (박선애)](https://github.com/SeonaePark)
- [@soyoung125 (박소영)](https://github.com/soyoung125)
- [@ch-0012 (박채영)](https://github.com/ch-0012)


## Tech Stack

**Client(App)** 

[![ㅇㅇ](https://img.shields.io/badge/App-Expo%20GO-lightgray)](https://expo.dev/client)
[![ㅇㅇ](https://img.shields.io/badge/App-React%20Native-blue)](https://reactnative.dev/)
[![ㅇㅇ](https://img.shields.io/badge/App-Native%20Base-9cf)](https://nativebase.io/)
[![ㅇㅇ](https://img.shields.io/badge/App-React%20Native%20Navigation-blueviolet)](https://reactnavigation.org/)


**Client(Web)**

[![ㅇㅇ](https://img.shields.io/badge/Web-React-blue)](https://reactjs.org/)
[![ㅇㅇ](https://img.shields.io/badge/Web-React%20Router%20DOM-red)](https://v5.reactrouter.com/web/guides/quick-start)
[![ㅇㅇ](https://img.shields.io/badge/Web-Bootstrap-blueviolet)](https://getbootstrap.com/)


**Server**

[![ㅇㅇ](https://img.shields.io/badge/Backend-MongoDB-success)](https://www.mongodb.com/ko-kr)
[![ㅇㅇ](https://img.shields.io/badge/Backend-mongoose-red)](https://mongoosejs.com/)
[![ㅇㅇ](https://img.shields.io/badge/Backend-NodeJS-green)](https://nodejs.org/ko/)
[![ㅇㅇ](https://img.shields.io/badge/Backend-ExpressJS-black)](https://reactnative.dev/)





## Project Structure

앱  사용하는 구조는 다음과 같습니다.

    src
     |-components
     |-routes
     |-views

- components

재사용이 가능한 형태의 요소를 모아두는 폴더. view에서 자주 사용하는 공통 요소들을 모아놓는다.

- routes

React Native Navigation에 관련된 코드

- views

routes에 삽입할 view를 모아놓는 폴더

## Features

- 일기 CRUD
  - 일기 작성하기
    - 태그 선택기
      - 버튼형
      - 검색형
    - 제목 작성하기 [![ㅇㅇ](https://img.shields.io/badge/Web-yellow)]()
    - WYSIWYG 편집기 [![ㅇㅇ](https://img.shields.io/badge/Web-yellow)]()
    - 공개 여부 설정 [![ㅇㅇ](https://img.shields.io/badge/Web-yellow)]()
  - 일기 읽기 [![ㅇㅇ](https://img.shields.io/badge/Web-yellow)]()
  - 일기 수정하기
  - 일기 삭제하기
- 모두의 일기
    - 일기
        - 일기 목록 조회 [![ㅇㅇ](https://img.shields.io/badge/Web-yellow)]()
        - 일기 목록 새로 고침 [![ㅇㅇ](https://img.shields.io/badge/Web-yellow)]()
        - 일기 검색하기
        - 일기 좋아요
        - 일기 댓글
    - 프로필
        - 구독(팔로우/팔로잉)
        - 구독 조회
        - 프로필 조회 [![ㅇㅇ](https://img.shields.io/badge/Web-yellow)]()
    - 교환 일기
        - 교환 일기 작성
        - 교환 일기 조회
- 할 일
  - 할 일 등록
  - 할 일 확인(체크)
  - 할 일 월별 모아보기
- 통계
  - 할 일 통계
  - 일기 태그 통계
    - 개인 통계
    - 친구 통계
    - 익명 통계
- 기타
  - 로그인/로그아웃 [![ㅇㅇ](https://img.shields.io/badge/Web-yellow)]()
  - 회원가입 [![ㅇㅇ](https://img.shields.io/badge/Web-yellow)]()

## Demo and Screenshots

![App Screenshot](app/screenshots/%EC%95%B1_%EB%AA%A8%EB%91%90%EC%9D%98%20%EC%9D%BC%EA%B8%B0.gif)
![App Screenshot](app/screenshots/%EC%95%B1_%EB%8C%93%EA%B8%80%20%EB%8B%AC%EA%B8%B0.gif)
![App Screenshot](app/screenshots/%EC%95%B1_%EC%9D%BC%EA%B8%B0%20%EB%A9%94%EC%9D%B8.gif)
![App Screenshot](app/screenshots/%EC%95%B1_%EC%9D%BC%EA%B8%B0%20%EC%9D%BD%EA%B8%B0.gif)
![App Screenshot](app/screenshots/%EC%95%B1_%EC%9D%BC%EA%B8%B0%20%EC%9E%91%EC%84%B1.gif)
![App Screenshot](app/screenshots/%EC%95%B1_%ED%8C%94%EB%A1%9C%EC%9A%B0.gif)

![Web Screenshot](web/screenshots/%EC%9B%B9_%EC%9D%BC%EA%B8%B0%20%EC%9D%BD%EA%B8%B0.gif)
![Web Screenshot](web/screenshots/%EC%9B%B9_%EC%9D%BC%EA%B8%B0%20%EC%9E%91%EC%84%B1.gif)


## Environment Variables

이 프로젝트 중 앱을 구동하기 위해서는 config.js 파일을 수정해줘야 합니다.
현재 PC의 내부 ip를 적습니다. (반드시 앱 구동 전에 실시되어야 합니다.)

```
export const config = {
	ip : 'http://192.168.0.11',    //이 부분을 수정
    ...
};
```

## Run Locally

클론

```bash
  git clone https://github.com/gabrielyoon7/GIDAL
```

## Installation

이 프로젝트를 설치하기 위해...

### 설치 경로

프로젝트는 반드시 C드라이브에 clone합니다.

    C://GIDAL


### `npm install`

> **Note: 패키지 변화가 없으면 매번 작업을 할 필요가 없습니다.**

package.json에 있는 npm 설치 이력을 토대로 본인 컴퓨터에 패키지를 자동으로 설치합니다.
이 작업은 평소에 할 필요가 없지만, 누군가가 새 패키지를 설치하는 경우 다른사람들이 모두 해줘야 합니다.

    부가 옵션으로 과거 버전의 패키지를 설치하는 방법이 있습니다.
    npm install --legacy-peer-deps
    패키지 설치 시 더이상 과거 버전을 지원하지 않는다거나 권장하지 않는다고 설치를 거부하는 경우 레거시 버전을 설치하는 방법입니다.

    만약 위 명령어로도 설치가 불가능하면
    npm install --force
    강제로 설치하는 명령어도 있습니다.

각각의 폴더에서 npm 설치 작업을 진행하여야 합니다.
## Deployment

이 프로젝트를 실행하기 위해...

### `npm start`
> **Note: 아래 `install 명령어`를 먼저 실행할 필요가 있을 수도 있습니다.**

이 프로그램을 실행하게 합니다.
실행에 성공하면 Expo가 자동으로 실행됩니다.

Expo는 Android나 iOS에 설치 후 스마트폰에서 직접 실행이 가능합니다.

이 프로젝트를 수정하고 저장하면 자동으로 리로딩이 됩니다.
오류가 발생하면 터미널 콘솔창에 찍힙니다. (터미널에 찍히지 않는 경우에는 웹 브라우저에서 확인)

    부가 옵션으로 cache를 초기화 하면서 실행하는 방법이 있습니다.
    npm start --reset-cache
    분명 코드가 잘 들어갔고, 아무리 생각해도 문제가 없음에도 불구하고 오류가 발생하면 위 명령어로 실행하는 방법이 있습니다.


## Documentation

- [2022 한국정보기술학회 하계 대학생논문경진대회](https://ki-it.or.kr/%EA%B3%B5%EC%A7%80%EC%82%AC%ED%95%AD/11345517)


## License

TBD

## Support

For support, email gabrielyoon7@gmail.com.

