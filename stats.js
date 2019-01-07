function choise(){
  return 0===Math.floor(Math.random()*9);   
}

function series(n){
  var k = 0; var t = 0;
  do {
    t++;
    if (choise()){k++;};
  } while (k<n);
  return t;
}

function experiment(h, n){
  var temp = 0; var sum = 0;
  var results = {avg:0,list:[]}
  for (var i=0;i<h;i++){
    temp = series(n);
    sum+=temp;
    results.list.push(temp);
  };
  results.list.avg = sum / h;
  return results;
}

experiment(40, 5);
