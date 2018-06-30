// Пример работы Nodejs+Memcached
// npm install memcached
// Вспомогательная функция
var cbOnCacheRead = function(OnFound, OnNotFound){ // функция обратного вызова для чтения из кеша
   return function (data){ // data - контекстнонезависима, тк это формальный внутренний параметр замыкания
     if (data) { // если данные найдены
       OnFound(data); // выведем в отлабочную консоль
     }
     else // если не найдены
     {
       OnNotFound(data); // выводим соотв. сообщ.
     };
   }
}
// Вспомогательная функция
var cbOnCacheWrite = function(OnWriteSucc){ // функция обратного вызова для чтения из кеша
   return function (key, value){ // data - контекстнонезависима, тк это формальный внутренний параметр замыкания
     
       OnWriteSucc(key, value); // выведем в отлабочную консоль
     
   }
}

// ЧТЕНИЕ ИЗ КЕША
// Назначает фунции обратного вызова 
function CacheGetter(){
  return function(mc, key, OnFound, OnNotFound){
  mc.get(key, function(err, data){ // попытка считать ключ
    if (err) throw new Error(err);
    var cb = new cbOnCacheRead(OnFound, OnNotFound); // инициализируем функцию чтения из кеша
    cb(data); // передаем в нее контекст
  })
}
}
// ЗАПИСЬ В КЕШ
// Назначает фунции обратного вызова 
function CacheSetter(){
  return function(mc, key, value, lifetime, OnWrite){
  mc.set(key, value, lifetime, function(err){ // попытка считать ключ
    console.log(key, ' ', value);
    if (err) throw new Error(err);
    var cb = new cbOnCacheWrite(OnWrite); // инициализируем функцию чтения из кеша
    cb(key, value); // передаем в нее контекст
  })
}
}

// подключаем фабрику
var Memcached = require('memcached');
var mc = new Memcached(); // новый экземпляр
mc.connect('127.0.0.1:11211', function(err, conn){ // соединяемся
  if (err) throw new Error(err); // ошибки выбрасываем как исключения
  var getdata = new CacheGetter();
  var setdata = new CacheSetter();
  //                           /-- если данные найдены, выведем их
  //                          V 
  getdata(mc, "test_key", (data)=>{console.log(data);}, (data)=>{console.log("not found"); // если данные не найдены
  setdata(mc, "test_key", "WOW!", 10, (key, value)=>{console.log('try to write '+value+' for '+key); // пишем
  getdata(mc, "test_key", (data)=>{console.log(data);}, (data)=>{console.log("not found") // и пытаемся извлечь записанное
    });
    });
    });
  
  });
  
  
// Установим nodemon: $ npm install nodemon
/* nodemon test2.js
[nodemon] 1.17.5
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node test2.js`
not found
test_key   WOW!
try to write WOW! for test_key
WOW!
rs
[nodemon] starting `node test2.js`
WOW!
[nodemon] clean exit - waiting for changes before restart
*/
