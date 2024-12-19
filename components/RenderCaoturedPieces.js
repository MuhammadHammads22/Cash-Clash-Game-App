export const renderCapturedPiecesImages = (capturedPieces) => {
    const pieceImages = {
      bq: require('../assets/images/bq.png'),
      br: require('../assets/images/br.png'),
      bn: require('../assets/images/bn.png'),
      bb: require('../assets/images/bb.png'),
      bk: require('../assets/images/bk.png'),
      bp: require('../assets/images/bp.png'),
      wq: require('../assets/images/wq.png'),
      wr: require('../assets/images/wr.png'),
      wn: require('../assets/images/wn.png'),
      wb: require('../assets/images/wb.png'),
      wk: require('../assets/images/wk.png'),
      wp: require('../assets/images/wp.png'),
    };
  
    return Object.values(capturedPieces).map((piece, index) => {
      const imageSource = pieceImages[piece];
      return (
        <Image
          key={index}
          source={imageSource}
          style={{ width: 24, height: 24, marginRight: 4 }}
        />
      );
    });
  };
  