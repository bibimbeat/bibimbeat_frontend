// 액션 타입을 선언합니다
// 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서

// action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론 되도록 해줍니다.
const CHANGE_MUSIC = 'CHANGE_MUSIC';
const CHANGE_PRELISTENING_MUSIC = "CHANGE_PRELISTENING_MUSIC";

// Action Creator 
export const onChangeMusic = (currentSongData) => {
  return {
    type: CHANGE_MUSIC,
    payload: currentSongData,
  }
}

export const onChangePreListeningMusic = (currentSongData) => {
  return {
    type: CHANGE_PRELISTENING_MUSIC,
    payload: currentSongData,
  }
}

// 모든 액션 겍체들에 대한 타입을 준비해줍니다.
// ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
// 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
// type ButtonClickAction =
//   | ReturnType<typeof onChangeButtonText>;

// // 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
// type ButtonTextState = {
//   buttonText: string;
// };

// 초기상태를 선언합니다.
const initialState = {
  musicUrl: "",
  artist: "",
  title: ""
};

// 리듀서를 작성합니다.
// 리듀서에서는 state 와 함수의 반환값이 일치하도록 작성하세요.
// 액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정합니다.
function playButtonReducer(state = initialState, action) {

  switch (action.type) {
    case CHANGE_MUSIC:
      return {
        musicUrl: action.payload.musicUrl,
        artist: action.payload.artist,
        title: action.payload.title,
        isPreListening: false
      }
    case CHANGE_PRELISTENING_MUSIC:
      return {
        musicUrl: action.payload.musicUrl,
        artist: action.payload.artist,
        title: action.payload.title,
        isPreListening: true
      }
    default:
      return state;
  }
}


// store


export default playButtonReducer;