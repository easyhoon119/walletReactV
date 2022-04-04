# 초기 시작 방법

- 처음 파일을 받은 후 npm install 실행

# 1.

- webpack 및 typeScript 초기 설정 완료
- react 초기 설정(react-router-dom, redux, styled-components, dotenv)
- svg, png, jpg, font 설정 추가
- reset.css, serRem.css 추가

# 2.

- font가 안불러와지는 문제 해결
- build 파일 동작 확인(with serve)

# 3.

- redux dux 패턴 적용

# 4.

- metmask 지갑 연동
- kaikas 지갑 연동

# 5.

- useMediaQuery 연결(react-responsive)
- eslint, react-eslint, typescript-eslint 설정

# 6.

- js버전 및 node 충돌 해결
- api 모듈 추가(
  사용법 :
  const [result, loading, error] = useApi(
  `endpoint`,
  "get",
  ""
  );

  if (loading) {
  return <div>로딩중...</div>;
  }
  if (error) {
  navigate("/");
  }
  )
