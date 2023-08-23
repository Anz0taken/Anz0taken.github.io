var targetAmount;
var pezziBanconote;
var pezziResto;
var resto;

pezziBanconote = new Array(banconoteDisponibili.length);
pezziResto = new Array(banconoteDisponibili.length + 6);

resetArray(pezziResto);
generaCaso();