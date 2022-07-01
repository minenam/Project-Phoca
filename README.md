# **Phoca ('Pho'to + Vo'ca')**

**📝 나만의 영단어장 서비스**

- 직접 찍은 사진의 사물을 인식하여 영단어로 변환해줍니다.
- 만들어진 단어장의 단어들을 학습할 수 있는 컨텐츠를 제공합니다.

![image](https://user-images.githubusercontent.com/59808674/176880303-1b710483-03c5-4314-b2ee-271d6a02471a.png)    

## 1. 프로젝트 소개

### 💡 기획 의도
- 언어를 배울 때 단어암기만큼 기본적인 요소는 없다.
- 언제 쓰일지도 모르는 초등 필수 영단어 800개를 의무적으로 외운다.
- 남의 정해주는 단어들을 외우다 보면, 지루해지기 마련이다.
- **내가 직접 찍은 사진으로 나만의 단어장을 만든다면?**

### 📍 목적 및 필요성
- 점점 직접 해내고 이뤄내고 싶은 것들이 많아지는 초등학교 학생들을 대상으로 합니다.
- 자기 자신이 배우고 싶은 주변 사물을 직접 찍으며 흥미를 잃지 않고 단어 학습을 할수 있게 돕습니다.

### ✨기대효과
- 단순히 일방적인 학습이 아닌, 사용자가 학습 자료를 직접 만드는 쌍방향 학습
- 흥미를 지속적으로 유지하며 시각적인 매체를 통한 단기 학습 기억 향상

### 🎈 활용방안
- 어린 아이 뿐만 아니라 저시력자들에게도 효과적인 배움을 제공 가능
- 청소년이나 성인들로 대상을 확장하여 문장 단위의 재미있는 영어 학습 서비스로 개발 가능

## 2. 기술 스택 및 기술 문서

### 📚 기술 스택
| 📕 Front-end | 📘 Back-end | 📗 AI |
| :---: | :---: | :---: |
|Next.js<br />Typescript<br />React Query<br />Zustand<br />Styletron<br />|Nest.js<br />Typescript<br />TypeORM<br />PostgreSQL<br />AWS S3<br />GCP<br />Docker<br />|Python<br />Jupyter<br />TensorFlow<br />yolo<br />Flask<br />|

### 🗃 시스템 아키텍처
![image](https://user-images.githubusercontent.com/59808674/176872369-f3cee8a6-fa93-4064-a4aa-b838eccd7b4c.png)  

### 🛠 ER-Diagram
![image](https://user-images.githubusercontent.com/59808674/176872435-04b84c54-7552-4814-9825-e51f71d738c7.png)  

### 📃 API 명세서
- [Swagger API 레퍼런스](https://app.swaggerhub.com/apis/PHOCAHELP/phoca-api-docs/1.0)

### 🖼 와이어프레임
- [Figma](https://www.figma.com/file/L48aThyqqlQRMsaaUQqMXa/DEVMON)

## 3. 기능

### 프로젝트 전체 기능 정리
- [프로젝트 전체 기능 정리](https://kdt-gitlab.elice.io/ai_track/class_04/ai_project/team6/ai-project/-/wikis/%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EC%A0%84%EC%B2%B4-%EA%B8%B0%EB%8A%A5-%EC%A0%95%EB%A6%AC)

### ⚙ 메인 기능
- 이미지 인식 후 단어로 변환
    - 사진에 찍힌 사물들을 AI가 인식하여 영단어와 한글 뜻으로 변환해줍니다
- 나만의 단어장 만들기
    - 이미지 인식으로 만든 단어들로 나만의 단어장을 만듭니다.
- 그림 단어 게임
    - 임의의 영단어가 주어지면 해당 단어를 AI가 맞출 수 있도록 직접 그림을 그려봅니다.

### 🔧 서브 기능
- 단어장 학습 컨텐츠
    - 단어장 암기 페이지: 단어장의 사진과 영단어, 뜻을 암기할 수 있는 페이지가 주어집니다.
    - 카드 짝 맞추기 게임: 단어장의 사진과 영단어를 짝을 맞추며 자연스럽게 암기를 도와줍니다.
- 다른 유저 단어장 검색 및 북마크
    - 다른 유저가 만든 단어장도 학습할 수 있게 검색하고, 북마크를 합니다.
- 단어를 읽어주는 TTS 서비스  
    - 단어의 발음을 읽어주는 서비스 입니다.

