// replace_clothing.js - Run with cscript
var fso = new ActiveXObject("Scripting.FileSystemObject");
var path = "C:\\Users\\Joy\\Desktop\\โครงงานจริงเเท้\\app.js";
var f = fso.OpenTextFile(path, 1, false, -1);
var code = f.ReadAll();
f.Close();
WScript.Echo("Read " + code.length + " chars");
