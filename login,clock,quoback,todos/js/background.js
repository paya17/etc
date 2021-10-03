const images = ["0.jpg","1.jpg","2.jpg"];  //2.이미지들 들어있는 array 만들기

const chosenImage = images[Math.floor(Math.random()*images.length)];  //3.이미지를 array에서 랜덤으로 고르기

const bgImage = document.createElement("img");
//4-1.js에서 html element 만들기(<img>태그)
/* **보통 html 먼저 작성하고, js에 html태그 '가져와서' '변경'
근데 여기선 js에서 html element 만들어서 html에 추가 */

bgImage.src = `img/${chosenImage}`;  //4-2.*js에서 html element를 생성!(결과물:<img src="img/0.jpg">)

document.body.appendChild(bgImage);  //4-3.appendChild()로 js에서 만든 html element를 body(html)에 마지막 자식노드로 추가(append:아래에 추가,prepend:맨위에 추가)








//img폴더에 이미지 3개 있음




