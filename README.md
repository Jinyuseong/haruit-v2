# 하루잇 v2

## 소개
하루잇 v2는 공부·운동 습관을 게임처럼 만들어주는 몰입 습관 앱입니다.  
공부/운동을 완료하면 경험치와 코인을 얻고, 내 방과 아바타를 꾸밀 수 있습니다.

## 주요 기능
- 회원가입/로그인 (MVP: 자체 계정)
- 공부/운동 모드 및 타이머
- 할 일(TaskList) 관리
- 캐릭터룸(방) 및 애니메이션
- 운동 기록(시간, 칼로리, 거리)
- 통계 시각화(주간/월간)
- 보상 시스템(코인/경험치)
- 방/아바타 커스터마이징
- 친구 방 방문(로드맵)
- PWA 지원(로드맵)

## 기술 스택
- **Frontend**: React, TypeScript, Tailwind CSS, DaisyUI, react-icons
- **Backend**: Node.js, Express, Prisma ORM
- **Database**: PostgreSQL
- **기타**: JWT 인증, HTTPS, DBeaver(DB 관리)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (예시)
npm run dev
```

## 폴더 구조

```
apps/web/           # 프론트엔드 코드
apps/api/           # 백엔드 코드
prisma/             # Prisma 스키마 및 마이그레이션
public/             # 정적 파일 및 이미지
```

## 문서
- [PRD 문서](./PRD.md)

## 기여
PR 및 이슈