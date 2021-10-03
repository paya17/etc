//서로 다른 기능은 서로 다른 파일들로 분리(*세분화해서 관리)

const clock = document.querySelector("h2#clock"); //3.h2태그 '가져오기'(그냥 #clock이라고 써도됨)

function getClock() {
    const date = new Date();  //*변수에 저장
    const hours = String(date.getHours()).padStart(2,"0");  //7.0,1이 아니라 00,01로 표시되도록,  date.getHours()는 '숫자'이기 때문에, padStart()를 쓰기 위해서는 '문자'로 바꿔야 한다->String()으로 감싸기
    const minutes = String(date.getMinutes()).padStart(2,"0");  //date.getHours()->String(date.getHours())->String(date.getHours()).padStart(2,"0")
    const seconds = String(date.getSeconds()).padStart(2,"0");  
    clock.innerText = `${hours}:${minutes}:${seconds}`;  //8.h2태그에 '변경'  [2강의]
    //clock.innerText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;  //new Date() object의 메서드 사용,따옴표가 아니라 백틱!
}  //4.

getClock();  //5.원래 새로고침하면 1초있다가 함수가 실행됐는데, 새로고침하자마자 시계가 보이도록 하기 위해 함수 즉시 호출
setInterval(getClock,1000);  //6.*interval 사용,1초마다 함수를 실행시킨다(실시간처럼 보이게 함!) [1강의]



//---------------------------------------------------------------//

/*
[0강의]
-interval:'매번' 발생해야하는 무언가 ex)매 2초마다 무슨 일이 일어나게 하고 싶을 때 interval 쓴다
 ->js에 있는 개념?!
[1강의]
-timeout
-(이미 정의돼있는) new Date() object->현재의 년월일요일,시분초 가져온다, 메서드 많음(->사용할거임)
[2강의]
-숫자 표시되는 방식 바꾸고 싶다(시간에서 0,1,2가 아니라 00,01,02가 나오게)
  ->string이 2개 이상의 문자를 갖도록!->padStart()라는 function 사용!
  ex)"1".padStart(3,"0") ->문자열 길이가 3보다 작으면, '3이 될때까지' string 앞쪽에(Start라고 적혀있으므로) "0"추가->"001"이 된다(padEnd는 string뒤쪽에 문자 추가)
*/

/*
function sayHello() {
    console.log("hello");
}

setInterval(sayHello,5000);
//setInterval(실행하고자 하는 'function', function호출을 '몇 ms마다' 할건지)->function을 몇ms마다 실행시켜준다! 

setTimeout(sayHello,5000);
//setTimeout(실행하고자 하는 'function', '몇ms 기다리고' function 호출할지)->몇ms 기다린 후에 function을 실행한다!(몇ms마다가 아님, 한번만 발생)
*/


//1000ms=1s=1초

//js에 이미 그 작업 수행하는 function 가지고 있을 수 있다!-padStart()




