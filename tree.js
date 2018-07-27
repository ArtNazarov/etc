var tree = [ 
{ id : "node1", 
  parent : "Section1" }, 
  { id : "Section1", 
  parent : "root"},
  { id : "Main Level",
  parent : ""},
  ]
function parent(tree, id){
 for (var i=0;i<tree.length;i++){ 
 if (tree[i].id==id) { 
 return tree[i].parent }; 
 }; return "";
}
function childs(tree, id){ 
var arr = [];
  for (var i=0; i<tree.length;i++) { 
  if (parent(tree, tree[i].id)==id) { 
  arr.push(tree[i]); }; 
    }; return arr;
}
function out_tree(tree, id, lvl){
  console.log(id);
  var str = "";
  for (var i=0;i<(2*lvl);i++){
    str = str + " ";
  };
  str = str + id + "\n\r";
  var nodes = childs(tree, id);
    for (var i=0;i<nodes.length;i++){
      str = str + out_tree(tree, nodes[i].id, lvl+1) + "\n\r";
    };
  return str;
}
