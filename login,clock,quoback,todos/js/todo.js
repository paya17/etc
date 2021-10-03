const toDoForm = document.getElementById("todo-form");  //4.form태그 가져오기
const toDoInput = document.querySelector("#todo-form input");  //7.input태그 가져오기
//toDoForm.querySelsctor("input")->document 대신 toDoForm으로
const toDoList = document.getElementById("todo-list");  //4.ul태그 가져오기




const TODOS_KEY = "todos";  //24.반복되는 string을 변수에 저장

//새로고침해도 todo들 안사라지게 하고싶다->input에 입력한 todo들을 'localstorage'에 저장한 후,새로고침하면 todo들을 localstorage로부터 불러와서 화면에 paint한다
let toDos = [];  //22.newTodo(input에 입력된 값)들이 들어갈 array만들기
//29.const->let으로 바꿔서 업데이트되도록(문제해결1)

//localstorage에는 array는 저장할 수 없고, 오직 텍스트만 저장 가능함->*하지만 'array로 저장하고 싶으면',js의 객체나 array를 string화 해주는 JSON.stringify 사용
function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));  //23.toDos array를 string화해서 localstorage에 저장  [3강의]문제:새로고침하면 local storage안의 todos array 남아있지만 화면에 paint는 안됨
} //toDos array를 localstorage에 저장하는 함수



function deleteToDo(event) {
    const li = event.target.parentElement;  //20.*여러 버튼들 중 어떤 버튼이 클릭된 지 모름->'click이벤트객체' 통해 클릭된 버튼이 무엇인지 알아낸다->click이벤트객체 안의 target프로퍼티로 어떤 html element이 클릭됐는지(여기에선 클릭한 button) 알아낸 후에, 그것의 parentElement프로퍼티로 부모태그(여기에선 클릭한 버튼이 포함된 li태그) 찾기
    li.remove();  //21.클릭된 버튼이 포함된 li태그 삭제하기  [2강의]문제:새로고침하면 todo들 사라진다
} //todo를 삭제하는 함수



function paintToDo(newTodo) {
    const li = document.createElement("li");  //11.js에서 html element인 li태그 만들기(변수이름을 li가 아닌 potato라고 해도됨)
    li.id = newTodo.id;  //38.item의 id로 li태그들이 구별됨  [6강의]**데이터베이스(todos array)에 id를 도입했다->todos array안에 겹치는 item들 있어도 구별해서 삭제 가능!
    const span = document.createElement("span");  //12.js에서 html element인 (todo글 넣을)span태그 만들기(todo글 뿐만 아니라 삭제버튼도 만들거기때문에 li가 아니라 span에다가)
    //span.innerText = newTodo;  //13.span태그의 텍스트는(input의 value값이 들어있는 newTodo변수)
    span.innerText = newTodo.text;  //37.object의 text프로퍼티로
    const button = document.createElement("button");  //15.js에서 html element인 (삭제버튼이 될)button태그 만들기
    button.innerText = "X";  //16.
    button.addEventListener("click", deleteToDo);  //19.버튼 클릭하면 todo 삭제되도록
    li.appendChild(span);  //14.li태그 안에 자식태그로 span태그 넣기  [1강의]문제:todo를 지울 수 없다,새로고침하면 todo들 사라진다(저장돼있지 않아서)
    li.appendChild(button);  //17.li태그 안에 자식태그로 button태그 넣기
    toDoList.appendChild(li);  //18.html의 ul태그에 자식태그로 js에서 만든 li태그 추가하기(append는 맨마지막에!)  
} //todo를 그리는 함수



function handleToDoSubmit(event) {  //이벤트객체를 함수의 첫번째 인자로~
    event.preventDefault();  //6.submit해도 새로고침 안되게(*코드 처음부터 다시 실행안하고 이어나감~)
    const newTodo = toDoInput.value;  //8.input의 value를 **'newTodo 변수에 저장(복사)하기'
    toDoInput.value = "";  //9.input에 입력한 값 지우기(input.value에 뭔짓을 해도 newToDo변수에 영향안끼침)  [0강의]
    const newTodoObj = {
        text: newTodo,
        id: Date.now()
    };  //34.텍스트형식이 아니라, id도입해서 object형식으로
    toDos.push(newTodoObj);  //35.
    //toDos.push(newTodo); //23.paint하기 전에 newTodo를 toDos array에 push하기   
    //paintToDo(newTodo);  //10.newTodo변수(input의 value값이 들어있는)를 paintToDo함수로 보내기
    paintToDo(newTodoObj);  //36.
    saveToDos();  //24.
}


toDoForm.addEventListener("submit", handleToDoSubmit);  //5.


const savedToDos = localStorage.getItem(TODOS_KEY);  //25.localstorage에서 string화된 todos array를 '가져온다'

if (savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);  //26.*localstorage에서 가져온 string화된 todos array를, js에서 사용하기 위해 array화  [4강의]
    toDos = parsedToDos;  //30.*이렇게 하면 새로고침했을때 'todos array'가 항상 빈 array로 시작하는게 아니라 이전의 todo들이 담겨있는 array로 시작할 수 있다(todos array:[]->[a,b,c]->[a,b,c,d,e]) (문제해결2)
    parsedToDos.forEach(paintToDo);  //27.forEach 사용하여 todos array(parsedToDos)에 있는 각각의 item에 대해 paintToDo함수 실행(새로고침하면 local storage안의 todos array 남아있지만 화면에 paint는 안되었던 문제 해결)
} //localstorage에 저장돼있는 todo들을 새로고침했을 때 화면에 paint하는
//28.문제 발생:새로고침하고 새로운 todo들 추가하면 localstorage에 기존 todo들 사라지고 새로운 todo들로 덮어씌워짐->새로고침해서 코드 다시 실행될때 todos array는 항상 비어있기 때문에([])
//31.[5강의]문제:todo들 삭제했는데 새로고침하면 다시 화면에 생겨남->localstorage에서는 삭제되지 않았기 때문에
//32.todos array(데이터베이스)가 ["a","b","c","a"]인 경우 어떤 a를 삭제했는지 모르기 때문에, todos array를 id를 도입해서(item들 구별하기 위해!!) [{id:1212(랜덤한 id), text:"drink"(todo내용)}] 텍스트 말고 object형식으로 바꾸고 싶다
//33.랜덤한 id(숫자) 만드는 법->Date.now() 사용


//*새로고침의 유무

//새로고침-localstorage

//*JSON.stringify: 서버(localstorage)에서 사용할 수 있도록, string화
//*JSON.parse: 클라이언트(js)에서 사용할 수 있도록, 객체화 or array화

//*js에서는, forEach()가 array에 있는 각각의 item에 대해서 function을 실행할 수 있게 해준다

//todos array가 데이터베이스, localstorage는 데이터베이스가 아니라 todos array를 복사해둔곳

//filter->array에서 item을 지우는게 아니라, 예전array는 그대로 있고 '지우고 싶은 item을 제외하고 새array를 만든다'
//filter->forEach와 비슷한 기능도 가짐
/*
function sexyFilter() {

}

[1,2,3,4].filter(sexyFilter)->1,2,3,4에 '각각' sexyFilter함수가 실행되는데, 새array에 1,2,3,4를 포함하고 싶으면 sexyFilter함수가 반드시 true를 return해야한다(false를 return하면 제외된다)
*/






//4분