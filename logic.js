const gameStart = (() => {
  let arrayList = [[0, 0, 0],
                   [0, 0, 0],
                   [0, 0, 0]];
  const gamers = [];
  const queue =  [];

  function newPlayer(name, sign) {
    this.name = name;
    this.sign = sign;
  }

  const playerCreator = (name) => {
    if(gamers.length >= 2) {console.error("Game is full"); return 1;};
    if(gamers == 0) {player = new newPlayer(name, "x")} else{player = new newPlayer(name, "o")}
    gamers.push(player);
  }

  const adder = (pos) => {
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
    winCheck(pos, Number(!queue[0]))
  }

  function winCheck(pos, winner) {
    let value = arrayList[pos[0]][pos[1]];
    let x = 0;
    let y = 0;
    let xy1 = 0;
    let xy2 = 0;
    for (let i = 0; i<3; i++){
      if(value == arrayList[i][pos[1]]) x++;
      if(value == arrayList[pos[0]][i]) y++;
      if(value == arrayList[i][i]) xy1++;
      if(value == arrayList[i][2-i]) xy2++;
    }
    if(x==3 || y == 3 || xy1 == 3 || xy2 == 3) {console.log(`${gamers[winner].name} win`);  return 0}
  }

  function restart () {
    arrayList.forEach(el => {
      arrayList[arrayList.indexOf(el)] = [0, 0, 0];
    })
  }
  return {arrayList, adder, restart, playerCreator};
})()