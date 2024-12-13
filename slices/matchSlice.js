import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    matchId:'',
    initialFen:'',
    player:'',
    isMyTurn:false,
    opponentInfo:null
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setPlayer(state, action) {
      state.player = action.payload
    },
    setOpponentInfo(state,action){
      state.opponentInfo=action.payload
    },
    setMyTurn(state, action) {
        state.isMyTurn = action.payload
    },
    setMatchId(state, action) {
      state.matchId = action.payload
  },
    setInitialFen(state, action) {
      state.initialFen = action.payload
  },    
    clearMatchData(state) {
      state.player=''
      state.isMyTurn=false
      state.initialFen=''
      state.matchId=''
    },
  },
});

export const { setPlayer, setMyTurn, clearMatchData ,setInitialFen,setMatchId,setOpponentInfo} = matchSlice.actions;
export default matchSlice.reducer;
