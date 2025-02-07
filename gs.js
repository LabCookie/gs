// Note to self or anyone forking this disgusting project: for every function, use this:
// if (!define_mode) {
//      // Do anything here
//    } else {define_mode_log.push(`YOUR_COMMAND ${quotify(args.join(" "))}`)}


function split_p(text,delimiter=" ") {
  let i = 0;
  let in_quotes = false;
  let str = "";
  let arr = [];

  while (i < text.length) {
      if ((text[i] != "\"" && text[i] != "\\") || text[i-1] == "\\") {str += text[i];}
      if (text[i] == "\"") {if (text[i-1] != "\\") {in_quotes = !in_quotes}}
      if (text[i] == delimiter && !in_quotes) {
          arr.push(str.trim(delimiter));
          str = "";
      }
      i++;
  }
  arr.push(str.trim(delimiter));

  return arr;
}
function quotify(text) {
  if (text.includes(" ")) {return `"${text}"`}
}

let define_mode = false;
let define_mode_log = [];
let def_name = "";

let gs_variables = {
  version: "GSv1"
};
let generic_script = {
  OUT: function(args) {
    if (!define_mode) {
      if (args[0][0] == "%") {console.log(gs_variables[args[0].slice(1)])}
      else {console.log(args[0])}
    } else {define_mode_log.push(`OUT ${quotify(args.join(" "))}`)}
  },
  VAR: function(args) {
    if (!define_mode) {
      if (args[1][0] == "%") {gs_variables[args[0]] = gs_variables[args[1].slice(1)]}
      else {gs_variables[args[0]] = args[1]}
    } else {define_mode_log.push(`VAR ${quotify(args.join(" "))}`)}
  },
  DEF: function(args) {
    def_name = args[0];
    define_mode = true;
  },
  END: function(args) {
    if (args[0] == "DEF") {
      define_mode = false;
      generic_script[def_name] = function() {interpret_GS(define_mode_log.join("\n"))}
    }
  }
};

function interpret_GS(text) {
  let lines = text.split("\n");

  lines.forEach((line) => {
    let tokens = split_p(line);
    let command = tokens[0];
    tokens.splice(0,1);
    generic_script[command](tokens)
    
  });
}


// And to test the waters...
if (false) {
  interpret_GS(`VAR I false
  DEF IS_LABCOOKIE_HOMOSEXUAL
  VAR I true
  END DEF
  DEF IS_LABCOOKIE_SMART
  VAR I false
  END DEF
  IS_LABCOOKIE_HOMOSEXUAL
  OUT %I
  IS_LABCOOKIE_SMART
  OUT %I`);
}
