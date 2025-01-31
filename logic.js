const gameStart = (() => {
  let arrayList = [[0, 0, 0],
                   [0, 0, 0],
                   [0, 0, 0]];
  const gamers = [];
  const queue =  [];
  const win = [];
  const confBut = document.querySelector(".confirmer");

  function newPlayer(name, sign) {
    this.name = name;
    this.sign = sign;
  }

  confBut.addEventListener("click", () => {
    const beg = document.querySelector(".begin");
    let inpPlayer1 = document.querySelector("#one").value;
    let inpPlayer2 = document.querySelector("#two").value;
    !inpPlayer1 ? inpPlayer1 = "Anonymus 1": inpPlayer1;
    !inpPlayer2 ? inpPlayer2 = "Anonymus 2": inpPlayer2;
    playerCreator(inpPlayer1);
    playerCreator(inpPlayer2);
    beg.style.display = "none";
  });

  const playerCreator = (name) => {
    if(gamers.length >= 2) {console.error("Game is full"); return 1;};
    if(gamers == 0) {player = new newPlayer(name, "x")} else{player = new newPlayer(name, "o")}
    gamers.push(player);
  }

  const adder = (pos) => {
    if(win != 0){alert("restart the game to play again"); return 0}
    if(pos.length != 2) {console.error("Invalid size of array"); return 1;};
    if(pos[0]>2 || pos[0]<0 || pos[1]>2 || pos[1]<0) {console.error("Invalid number of value"); return 1;};
    if(arrayList[pos[0]][pos[1]] != 0){console.error("Can not add properties it is full"); return 1;};
    if(queue == 0) {
      arrayList[pos[0]][pos[1]] = gamers[0].sign;
      queue[0] = 1;
    } else {
      arrayList[pos[0]][pos[1]] = gamers[1].sign;
      queue[0] = 0;
    }
    UI(pos[0]*3+pos[1]+1, !queue[0]);
    if (winCheck(pos, Number(!queue[0]))) {
      const changeHelp = gamers[0].name;
      queue[0] = 0;
      gamers[0].name = gamers[1].name;
      gamers[1].name = changeHelp;
    }
  }

  function winCheck(pos, winner) {
    let value = arrayList[pos[0]][pos[1]];
    let x = 0;
    let y = 0;
    let xy1 = 0;
    let xy2 = 0;
    let ar = 0;
    for (let i = 0; i<3; i++){
      if(value == arrayList[i][pos[1]]) x++;
      if(value == arrayList[pos[0]][i]) y++;
      if(value == arrayList[i][i]) xy1++;
      if(value == arrayList[i][2-i]) xy2++;
    }
    if(x==3 || y == 3 || xy1 == 3 || xy2 == 3) {alert(`${gamers[winner].name} win`); win[0] = 1; return true}
    arrayList.forEach(el => {
      el.forEach(e => {
        if (e != 0) ar++;
      })
    })
    if(ar==9) {alert("Draw! Restart the game"); return true}
    return false;
  }

  function UI(num, sign) {
    const div = document.querySelector(`.into > .d${num}`);
    sign ? div.textContent = "O" : div.textContent = "X";
  }

  function restart () {
    const divs = [...document.querySelectorAll(`.into > div`)];
    arrayList.forEach(el => {
      arrayList[arrayList.indexOf(el)] = [0, 0, 0];
    })
    divs.forEach(el => {
      el.textContent = "";
    })
    win[0] = 0;
  }
  return {arrayList, adder, restart, playerCreator};
})()