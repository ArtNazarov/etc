
function link(tree, id){
 for (var i=0;i<tree.length;i++){ 
 if (tree[i].id==id) { 
 return tree[i].link }; 
 }; return "";
}
function parent(tree, id){
 for (var i=0;i<tree.length;i++){ 
 if (tree[i].id==id) { 
 return tree[i].parent }; 
 }; return "";
}
function caption(tree, id){
 for (var i=0;i<tree.length;i++){ 
 if (tree[i].id==id) { 
 return tree[i].caption }; 
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
  var mclass = "menu-root";
  if (lvl==1) { mclass = "top-level-menu" };
  if (lvl==2) { mclass = "second-level-menu" };
  if (lvl==3) { mclass = "third-level-menu" };
  var str = `<div class="ul ${mclass}">`;
  for (var i=0;i<(2*lvl);i++){
    str = str + " ";
  };
  str = str + "<div class='li'><a href='"+ link(tree, id)+"'>"+caption(tree,id)+'</a>\n\r';
  var nodes = childs(tree, id);
    for (var i=0;i<nodes.length;i++){
      str = str + out_tree(tree, nodes[i].id, lvl+1) + "\n\r";
    };
  return str+"</div></div>";
}

function loadMenu(tree){
   return out_tree(tree, "root", 0);
}