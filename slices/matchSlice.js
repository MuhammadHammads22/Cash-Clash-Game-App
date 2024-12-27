import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  matchId: '',
  tier:null,
  initialFen: '',
  gameEnd:false,
  player: '',
  won:false,
  isMyTurn: false, 
  opponentInfo: null,
  game_over: false,
  in_check: false,
  in_checkmate: false,
  in_draw: false,
  in_promotion: false,
  in_stalemate: false,
  in_threefold_repetition: false,
  insufficient_material: false,
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setPlayer(state, action) {
      state.player = action.payload;
    },
    setOpponentInfo(state, action) {
      state.opponentInfo = action.payload;
    },
    setMyTurn(state, action) {
      state.isMyTurn = action.payload;
    },
    setGameEnd(state,action){
      state.gameEnd=action.payload
    },
    setMatchId(state, action) {
      state.matchId = action.payload;
    },
    setInitialFen(state, action) {
      state.initialFen = action.payload;
    },
    setWon(state, action){
      state.won=action.payload
    },
    clearMatchData(state) {
      state.player = '';
      state.won=false
      state.tier=null,
      state.isMyTurn = false;
      state.initialFen = '';
      state.matchId = '';
      state.opponentInfo = null;
      state.game_over = false;
      state.in_check = false;
      state.in_checkmate = false;
      state.in_draw = false;
      state.in_promotion = false;
      state.in_stalemate = false;
      state.in_threefold_repetition = false;
      state.gameEnd=false;
      state.insufficient_material = false;
    },
    // New setters for the new state properties
    setGameOver(state, action) {
      state.game_over = action.payload;
    },
    setTier(state, action) {
      state.tier = action.payload;
    },
    setInCheck(state, action) {
      state.in_check = action.payload;
    },
    setInCheckmate(state, action) {
      state.in_checkmate = action.payload;
    },
    setInDraw(state, action) {
      state.in_draw = action.payload;
    },
    setInPromotion(state, action) {
      state.in_promotion = action.payload;
    },
    setInStalemate(state, action) {
      state.in_stalemate = action.payload;
    },
    setInThreefoldRepetition(state, action) {
      state.in_threefold_repetition = action.payload;
    },
    setInsufficientMaterial(state, action) {
      state.insufficient_material = action.payload;
    },
  },
});

export const {
  setPlayer,
  setMyTurn,
  clearMatchData,
  setInitialFen,
  setMatchId,
  setOpponentInfo,
  setGameOver,
  setInCheck,
  setInCheckmate,
  setInDraw,
  setInPromotion,
  setInStalemate,
  setInThreefoldRepetition,
  setInsufficientMaterial,
  setWon,
  setGameEnd,
  setTier
} = matchSlice.actions;

export default matchSlice.reducer;
