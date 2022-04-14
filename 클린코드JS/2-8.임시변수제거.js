// 전역공간을 최대한 사용하지 말라는 이유는?(전역공간 최대한 더럽히지 않기)
// 어디서나 접근이 가능하기 때문이다.
// 파일을 나누면 스코프가 나뉜다고 생각 할 수 있지만, 나뉘지 않는다.
// 따라서, 애초에

// 1. 전역변수 만들지 않기
// 2. 지역변수 사용
// 3. window, global 조작하지 않기
// 4. const, let사용
// 5. IIFE(즉시실행함수), Module,Closure 스코프를 나누기

// 참고로, 전역공간이란?
// 최상위를 뜻한다.
// 또한 window(브라우저에선 window가 최상위)와 global(node.js에선 global이 최상위)로 환경이 나뉜다.

// 임시변수 제거하기
// scope안에서 전역변수처럼 활용되는 것을 말한다.
// 코드를 살펴보자.
// function getObject() {
//   const result = {};  // 이 경우도 임시객체라 볼 수 있다
//   result.title=document.querySelector('.title')
//   result.text=document.querySelector('.text')
//   result.value=document.querySelector('.value')

//   return result;
// }

// 위의 함수에서 지역변수인 const를 사용하여 빈 객체를 만들었다.
// 함수를 잘게 쪼갠다면 상관없겠지만,만약 해당함수가 커지면 전역공간이나 다름없는 상황이 나올 수도 있다.

// 그렇다면 임시객체들이 위험한 요소가 될 수 있으므로 함수가 커진다고 가정했을 때, 이 임시변수로 로직을 구성할경우 팀원이나 혹은 몇개월 후 나 스스로가 유혹을 받을 수도 있다.

// 그렇다면 임시변수나 객체를 어떻게 CRUD할까? (물론 함수를 쪼개는게 가장 좋지만!)

// function getElements() {
//   const result = {
//   	title:document.querySelector('.title'),
// 	text:document.querySelector('.text'),
// 	value:document.querySelector('.value'),
//   };

//   return result;
// }

// 혹은

// function getElements() {
//   return {
//   	title:document.querySelector('.title'),
// 	text:document.querySelector('.text'),
// 	value:document.querySelector('.value'),
//   };

// }
// 이렇게 그냥 바로 객체로 반환해버리면 된다.
// 임시객체가 생겨버리는 순간 그 객체에 계속 접근, CRUD할 수 있다는 뜻이므로 최대한 지양한다.

// 또다른 예제를 살표봐보자.
// function getDateTime(targetDate) {
//   let month = targetDate.getMonth();
//   let day = targetDate.getDate();
//   let hour = targetDate.Hours();

//   month = month >= 10 ? month : '0' + month; //CRUD
//   day = day >= 10 ? day : '0' + day;
//   hour = hour >= 10 ? hour : '0' + hour;

//   return{
//   	month, day, hour
//   }
// }

// 이 함수가 할 수 없는 추가적인 스펙이 생길 때(기획,마케팅적 요구) 문제가 생길 수 있다.
// 우리는 두가지로 해결하려 할 것이다
// 1. 새로운 함수를 추가
// 2. 이 함수를 유지보수하며 수정

// 우선, 위의 함수에 let으로 할당된 변수를 const로 바꾼다.
// (let은 수정 & 재할당한다 라는 약속을 의미할 수 있기 때문)
//   const month = targetDate.getMonth();
//   const day = targetDate.getDate();
//   const hour = targetDate.Hours();

// 그리고 바로 return해주도록 한다
// return{
//   	month: month >= 10 ? month : '0' + month,
//     day: day >= 10 ? day : '0' + day,
//     hour: hour >= 10 ? hour : '0' + hour,
//   }

// 추가수정사항은?
// 위의 함수를 한번 더 사용하면 된다.
// 함수를 추상화 했기 때문에 '재활용' 할 수 있는 것이다.

// function getDateTime() {
//   const currentDataTime = getDateTimte(new Date())

//   return{
//     month: currentDataTime.month + '달 전',
//     day: currentDataTime.day + '달 전',
//     hour: currentDataTime.hour + '달 전',
//   }
// }

// 결론: 임시변수는 최대한 제거한다!

// 이유: 명령형으로 가득한 로직이 나오게 된다
// 어디서 어떻게 잘못되었는지 디버깅이 힘들게 된다
// 임시변수를 쓰게되면 추가적인 코드를 작성하게되는 유혹이 생긴다

// 해결책: 함수 나누기(하나의 함수, 하나의 역할)
// 바로 반환하기
// 고차함수(Map, filter, reduce 등) 사용하기
// 명령형이 아닌, 선언형으로 프로그래밍하기
