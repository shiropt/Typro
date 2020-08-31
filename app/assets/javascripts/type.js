function TypeStart() {
  
  const words = [
    "indexOf","lastIndexOf","charAt","match","replace","substring(start, end)","substr(start, length)","split(separator)",
    "toUpperCase","toLowerCase","link","concat","trim","push","pop","unshift","slice",
    "sort","reverse","concat","join","splice","Math.random","ceil","floor","round","max","min",
    
  ];
  const meanings = [
    "前方からstrを検索する。見つからない場合は-1を返す。","後方からstrを検索する。見つからない場合は-1を返す","index番目の文字を返す","パターン検索","パターン検索して、strに置換","start文字目からend文字目までを取得","start文字目からlength文字を取得","文字列をseparatorで区切って配列に分割",
    "大文字に変換","小文字に変換","リクエストするハイパーテキストリンクを作成","結合する","文字列の両端から空白を取り除く","	配列の最後に要素を追加","配列の最後の要素を取り出す","配列の先頭に要素を追加","指定範囲の要素を取り出す",
    "ソート","	並び順を逆にする","連結","配列の要素を指定区切り文字で連結","要素を置換","	乱数取得 （0以上1未満）","切り上げ","切捨て","四捨五入","最大値","最小値"
  ];

  let m;
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 6 * 10000;
  let startTime;
  let isPlaying = false;
  
  const target = document.getElementById("target");
  const scoreLabel = document.getElementById("score");
  const missLabel = document.getElementById("miss");
  const timerLabel = document.getElementById("timer");
  const btn = document.getElementById('startbtn');
  const result = document.getElementById('result');
  const meaning = document.getElementById('meaning');
  
  
  function updateTarget(){
    let placeholder = "";
    for (let i = 0; i<loc;i++){
      placeholder +="_";
    }
    target.textContent = placeholder + word.substring(loc);
    meaning.textContent = m;
    
  }
  function updateTimer(){
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft /1000).toFixed(2);
    
    const timeoutId = setTimeout(() =>{
      updateTimer();
    },10);
    if(timeLeft < 0){
      isPlaying = false;
      
      clearTimeout(timeoutId);
      timerLabel.textContent = "0.00";
        setTimeout(() => {
          showResult();
        }, 100);
        target.textContent = "click to replay";
        meaning.textContent = "";
      }
    }
    function showResult(){
      const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
      const point = score - miss;
      result.textContent = (`今回のスコアは${point}点、正解率は${accuracy.toFixed(1)}% でした！`);
      const form = document.getElementById
      ('score-form').value = point;
    }
    
    btn.addEventListener("click",() =>{
      if (isPlaying === true){
        return;
      }
      isPlaying = true;
      
      loc = 0;
      score = 0;
      miss = 0;
      scoreLabel.textContent = score;
      missLabel.textContent = miss;
      let num = Math.floor(Math.random() * words.length);
      word = words[num];
      m = meanings[num]
      
      target.textContent = word;
      meaning.textContent = m;
      startTime = Date.now();
      updateTimer();
      
    });
    window.addEventListener("keydown", e =>{
      if (isPlaying !== true){
        return;
      }
      if(e.key === word[loc]){
        loc++;
        if (loc === word.length) {
          let num2 = Math.floor(Math.random()*words.length)
          word = words[num2];
          m = meanings[num2];
          loc = 0; 
        }
        updateTarget();
        score++;
        scoreLabel.textContent = score;
      }else{
        miss++;
        missLabel.textContent = miss;
      }
    });
}


window.onload = TypeStart