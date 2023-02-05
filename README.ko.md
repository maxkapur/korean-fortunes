# korean-fortunes

[![en](https://img.shields.io/badge/lang-en-green.svg)](./README.md)
[![ko](https://img.shields.io/badge/lang-ko-red.svg)](./README.ko.md)

korean-fortunes는 [위키인용집](https://ko.wikiquote.org/wiki/%EA%B0%80%EB%82%98%EB%8B%A4%EC%88%9C_%ED%95%9C%EA%B5%AD_%EC%86%8D%EB%8B%B4)에서 추출한, UNIX의 `fortune` 프로그램 형식으로 맞춘 한글 속담 모음이다.

## 예시

명령어 `fortune korean`으로 무작위의 속담을 출력할 수 있다.

````text
$ fortune korean
“우물을 파도 한 우물을 파라”
    어떤 일을 할 때는 한 가지 일을 끝까지 열심히 해야 성공할 수 있다는 뜻.
$ fortune korean
“꿩 대신 닭이다”
    꼭 필요한 것이 없을 때 그와 비슷한 것으로 대신할 수 있다는 뜻.
$ fortune korean
“털도 안 뜯고 먹겠다 한다”
    몹시 성급하게 하려고 덤빈다는 뜻으로, 남의 물건을 통째로 먹으려 할 때도 쓰임.
$ fortune korean
“구렁이 담 넘어가듯 한다”
    일의 끊고 맺음을 확실히 하지않고 슬그머니 얼버무리고 대강 지나갈 경우에 쓰는 말.
````

fish 셸에서 한글 속담을 인사 함수(`fish_greeting.fish`)로 사용할 수도 있다.

![fish 셸의 프롬프트와 `fish_greeting.fish` 스크립트가 출력한 하나의 속담. 이번에 선정된 속담은 “한 번 엎지른 물은 다시 주워 담지 못한다”이며 그뜻은 “한 번 지나간 일은 다시 돌이켜 회복할 수 없다는 말”이란다.](./example.png)

## 설치

리넉스의 [fortune-mod](https://github.com/shlomif/fortune-mod) 유틸리티와 같이 사용하려면 `korean`과 `korean.dat` 파일을 fortune 디렉토리에 추가하기만 하면 된다.

예를 들어 Fedora에서 다음 명령어를 사용할 수 있다:

````bash
# 미설치된 경우 fortune-mod를 설치하기
sudo dnf install fortune-mod
# 본 리포를 clone하고 해당 폴더로 cd
git clone https://github.com/maxkapur/korean-fortunes.git
cd korean-fortunes
# 데이터를 fortunes 디렉토리로 복사
sudo cp -t /usr/share/games/fortune/ korean korean.dat
# 필요없으면 clone된 리포를 삭제해도 됨
cd ..
rm -rf korean-fortunes
````

다음과 같이 `/usr/share/games/fortune/`에서 symlink를 정의하는 방법도 있다.

````bash
# 미설치된 경우 fortune-mod를 설치하기
sudo dnf install fortune-mod
# 본 리포를 clone하고 해당 폴더로 cd
git clone https://github.com/maxkapur/korean-fortunes.git
cd korean-fortunes
# fortunes 디렉토리에서 데이터 파일로 가는 symlink 만들기
sudo ln -s "$(pwd)/korean" /usr/share/games/fortune/korean
sudo ln -s "$(pwd)/korean.dat" /usr/share/games/fortune/korean.dat
````

이제 fortune 출처 목록에서 `korean`이 보이면 설치 완료된 상태이다.

````text
$ fortune -f
100.00% /usr/share/games/fortune
    ...
     0.55% hitchhiker
     1.21% humorists
     0.92% kids
     3.29% knghtbrd
     1.88% korean           ← 성공!
     1.26% law
     2.44% linux
     1.60% literat
    ...
````

디스트로에 따라 fortune 출처 디렉토리가 달라질 수 있으므로 `/usr/share/games/fortune/`을 다른 값으로 변경할 필요가 생긴다. 예를 들어 Arch에서는 fortune 디렉토리가 `/usr/share/fortune/`이며, 
Debian에서는 `/usr/share/games/fortunes/`(복사형 유의할 것)이다. 명령어 `fortune -f`를 입력하면 사용 중인 환경의 fortune 디렉토리를 알 수 있다.

## fish 인사말

fish 셸에서 속담을 인사말로 사용할 수 있다. `fish_greeting.fish` 스크립트는 무작위로 속담을 선정하고 약간의 텍스트 스타일링을 적용해서 출력한다. 이를 fish 인사 함수로 설정하기 위해 `korean-fortunes` 디렉토리에서 다음 명령어를 입력하면 된다.

````bash
cp fish_greeting.fish ~/.config/fish/functions/fish_greeting.fish
````

혹은 스크립트를 복사하는 대신 symlink를 사용하려면 다음 명령어를 사용한다.

````bash
ln -s "$(pwd)/fish_greeting.fish" ~/.config/fish/functions/fish_greeting.fish
````

## 해킹

`korean` fortune 파일을 생성할 때 쓰인 HTML과 Javascript 코드는 `src/` 디렉토리에서 찾을 수 있다. 

- `src/index.html`은 위키인용집의 HTML에서 불필요한 엘레멘트를 제거한 결과다. (자동화하는 대신 Emmet으로 수작업으로 처리하는 게 충분히 빠르다.)
- `src/index.html`에 `src/script.js` 스크립트를 붙이면 속담 목록을 object으로 나타내고 이를 fortune 형식으로 변환한 뒤 HTML 문서의 body 엘레멘트의 내용을 그것을 포함한 pre 엘레멘트로 대신한다. pre 엘레멘트의 내용을 `korean` 그대로 집어넣는다.
- `korean.dat`를 만들기 위해 명령어 `strfile -c % korean`을 사용한다.

## 볍무부

라이선스: MIT

개발자: [Max Kapur](https://maxkapur.com).

