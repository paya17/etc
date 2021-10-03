const quotes = [
    {
      quote: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    },
    {
      quote: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
    },
    {
      quote: "The world is a book and those who do not travel read only one page.",
      author: "Saint Augustine",
    },
    {
      quote: "Life is either a daring adventure or nothing at all.",
      author: "Helen Keller",
    },
    {
      quote: "To Travel is to Live",
      author: "Hans Christian Andersen",
    },
    {
      quote: "Only a life lived for others is a life worthwhile.",
      author: "Albert Einstein",
    },
    {
      quote: "You only live once, but if you do it right, once is enough.",
      author: "Mae West",
    },
    {
      quote: "Never go on trips with anyone you do ntot love.",
      author: "Hemmingway",
    },
    {
      quote: "We wander for distraction, but we travel for fulfilment.",
      author: "Hilaire Belloc",
    },
    {
      quote: "Travel expands the mind and fills the gap.",
      author: "Sheda Savage",
    },
  ];  //2.명언,작가 들어있는 object들이 들어있는 array 만들기({ }가 한 object)


const quote = document.querySelector("#quote span:first-child");  //4.*id가 quote인 div태그의 첫번째 span태그 '가져오기'
const author = document.querySelector("#quote span:last-child");  //                          두번째

const todaysQuote = quotes[Math.floor(Math.random()*quotes.length)];  
//5.{명언,작가}를 array에서 랜덤으로 고르기, 'index' 사용해 array안의 요소에 접근하기(quotes[]), 10대신 array의 길이인 quotes.length사용(*극단적으로 생각하기!!)
//*변수에 저장...(길어서?,의도?)

quote.innerText = todaysQuote.quote;     //6.js로 html '변경'(앞에 quote는 변수, 뒤에 quote는 object의 key)
author.innerText = todaysQuote.author;  


//-------------------------------------------------------------//

/*
-randomness
-array안의 요소에 접근하기->index 사용(0부터!)  ex)quotes[2]
-Math module 사용->js에서 이미 제공,다양한 function 가지고있음 
 ->*Math.random():'0~1'사이의 '랜덤'한 숫자 제공
   /소수점 자리 없애기 위해 1.Math.round(): 반올림,반내림해서 정수 만든다  2.Math.ceil():올림해서 정수 만든다  3.Math.floor():내림해서 정수 만든다
*/

//**가져오기,변경 















