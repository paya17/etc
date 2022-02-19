'use strict'

//스크롤링 전에는 navbar 투명했는데, 스크롤링하면 navbar 진해지게, padding 작아지게(전반적으로 무엇을 하는지)
const navbar = document.querySelector('#navbar'); //(html) element 가져오기
const navbarHeight = navbar.getBoundingClientRect().height; //navbar의 높이 가져오기, *변수에 할당
document.addEventListener('scroll',()=>{ //이벤트 등록.scroll 될때마다 옆에 (화살표)함수 호출해줘.():아무런 인자 받지 않고
    //console.log(window.scrollY);
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
}); //스크롤링이 navbar height 이상으로 발생하면, navbar의 classlist에 'navbar--dark'클래스 추가(BEM의 Modifier 이용)/아니면 클래스 제거->css 가서 그 클래스 만들어서 스타일링하기
 

//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu'); //navbar의 menu element 가져오기
navbarMenu.addEventListener("click", (event) => { //*클릭(이벤트발생)하면, 이벤트객체가 함수의 첫번째 인자로 전달됨
    //console.log(event.target); //클릭한 element가 출력됨(*이벤트객체 이용)
    //console.log(event.target.dataset.link); //html에서 navbar menu의 각 item에 'data-link=이동할 섹션의 id'를 저장했더니, 여기서 id( ex) #home)가 출력됨
    const link = event.target.dataset.link;
    if( link == null) {
        return;
    } //*data-link가 null이거나 undefined면, 아무것도 하지 않는다
        

    /*
    const scrollTo = document.querySelector(link); //ex)document.querySelector(#home), 해당 id를 갖고있는 섹션
    scrollTo.scrollIntoView( {behavior: "smooth"} ); //해당 id를 갖고있는 섹션으로 스크롤링됨, {behavior: "smooth"}이용해서 스무스하게 스크롤링되게
    */
    scrollIntoView(link); //반복되는 거 함수로 합치기(위에꺼)

    
    navbarMenu.classList.remove('open'); //화면크기 작을 때, navbar menu의 아이템 누르고 스크롤링 되면 '메뉴창 닫히도록'
})

//Handle click on "contact me" buttom on home(위와 비슷)
const homeContactBtn = document.querySelector('.home__contact'); //가져오기
homeContactBtn.addEventListener('click', () => { 
    /*
    const scrollTo = document.querySelector('#contact'); 
    scrollTo.scrollIntoView( {behavior: "smooth"} ); //contact 섹션으로 스크롤링 되도록
    */
   scrollIntoView('#contact'); //반복되는 거 함수로 합치기(위에꺼)
})

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector); 
    scrollTo.scrollIntoView( {behavior: "smooth"} ); 
} //*반복되는거 함수로 합쳐서 반복제거


//Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector("#home");
const homeHeight = home.getBoundingClientRect().height; //home의 높이 알아내기 
const homeContainer = document.querySelector(".home__container"); //내가 한거
document.addEventListener('scroll',() => {
    //console.log( homeHeight, window.scrollY);
    homeContainer.style.opacity = 1 - window.scrollY / homeHeight; //*알고리즘, opacity 이용, 배경말고 컨텐츠만 투명해지도록 homeContainer
})


 //Show "arrow up" button when scrolling down
 const arrowUp = document.querySelector(".arrow-up");
 document.addEventListener('scroll', ()=>{
     if(window.scrollY > homeHeight/2) {
        arrowUp.classList.add('visible'); //arrow up button의 classList에 visible 추가
     } else {
        arrowUp.classList.remove('visible');
     } 
 }) //home에서 반 정도 스크롤링돼서 내려왔을 때 Arrow up button이 생기도록

//Handle click on the "arrow up" button
arrowUp.addEventListener('click', ()=>{
    scrollIntoView('#home'); //정의한 function 사용
}) //Arrow up button 클릭했을 때 위로 올라가도록


//Projects
const likeBtnContainer = document.querySelector('.like__categories'); //like버튼들 들어있는 div태그 가져오기
const projectContainer = document.querySelector('.like__projects'); //프로젝트들 들어있는 div태그 가져오기
const projects = document.querySelectorAll('.project'); //*각각의 프로젝트를 '배열'로 전부 받아오기
likeBtnContainer.addEventListener("click", (event)=>{

    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter; //*count제외한 버튼 누른 경우 or count 누른 경우, 'data-filter의 값 받아오기'
    if(filter == null) {
        return; 
    } //data-filter의 값이 없으면(버튼 아닌 div태그의 부분 누른 경우) 아무것도 하지 않는다

    projectContainer.classList.add('anim-out'); //click이벤트 일어나면, projectContainer의 classList에 class 추가
    
    setTimeout(() => { //timeout(300ms=0.3초)되면 우리가 등록한 함수를 호출해줌
        
        projects.forEach((project)=>{
            //console.log(project); //*projects배열에 있는 각 아이템들을 하나씩 매개변수(project변수)에 할당해서 출력한다
            //console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type) { //*data-filter의 값과 data-type의 값을 비교
                project.classList.remove('invisible'); //안보여지는 걸 뺀다(보여지게)
            } else {
                project.classList.add('invisible');
            } //이후에 css에서 스타일링
        }) //data-filter값이 '*'거나/ data-filter값과 data-type값이 같으면 그 프로젝트가 보여지도록, 안그러면 안보여지도록
    
        projectContainer.classList.remove('anim-out'); //0.3초 지나면 anim-out을 클래스에서 제거해서 '원상태로 되돌아가도록'
   
    }, 300); 
    

    //class에 있던 active를 이전 애에서 '클릭된' 애한테 옮기기
    const actived = document.querySelector('.category__btn.active'); //이전에 클래스에 active가 있던 아이 가져오기
    actived.classList.remove('active'); //이전에 클래스에 active가 있던 아이의 클래스에서 active 없애기
    const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode; //button태그를 클릭한 경우엔 event.target 그대로 쓰고, span태그(count가 들어있는)를 클릭한 경우엔 event.target.parentNode(button태그)를 쓴다
    target.classList.add('active'); //클릭된 아이의 클래스에 active 추가하기
    
})


//Navbar toggle button for small screen(화면 크기 작을 때, navbar의 toggle버튼 누르면 메뉴가 나타나고,사라지도록)
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
//navbarMenu는 위에 정의돼있음!
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
}) //이후에 css에서 스타일링








