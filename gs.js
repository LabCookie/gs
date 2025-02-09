// split_p() (p for plus) is a function that does similar to the default split()
// but has support for spaces in a single argument by surronding the argument
// with double quotes
let ver = "GSv3";
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
function quote_backslash(text) {
  let output;
  if (text.includes("\"")) {output = text.replace(/"/g, "\\\"")}
  if (text.includes(" ")) {output = `"${text}"`}
  return output
}

function gs_command(command,args) {
  if (!define_mode || command == "END") {generic_script[command](args)}
  else {
    if (command != "DEF") {define_mode_log.push(`${command} ${args.map(arg => quote_backslash(arg)).join(" ")}`)}
    else {console.log("YOU CANNOT PERFORM DEF COMMAND WHILE IN DEFINE MODE")}
  }
}

let define_mode = false;
let define_mode_log = [];
let def_name = "";

let gs_variables = {
  version: ver,
  VER: ver
};
// If arg starts with % its a reference to a variable
let generic_script = {
  OUT: function(args) {
    if (args[0][0] == "%") {console.log(gs_variables[args[0].slice(1)])}
    else {console.log(args[0])}
  },
  VAR: function(args) {
    if (args[1][0] == "%") {gs_variables[args[0]] = gs_variables[args[1].slice(1)]}
    else {gs_variables[args[0]] = args[1]}
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
  },
  CONCAT: function(args) {
    let suffix = ""
    if (args.length > 2) {
      if (args[2] == "-S") {suffix = " "}
      else if (args[2][0] == "-") {suffix = args[2].slice(1)}
    }
    if (args[1][0] == "%") {suffix += gs_variables[args[1].slice(1)]}
    else {suffix += args[1]}
    
    gs_variables[args[0]] += suffix
  },
  IF_EQ: function(args) {
    let condition = gs_variables[args[0] == gs_variables[args[1]];
    if (args.length > 3) {
      if (args[3] == "~") {
        condition = !condition;
      }
    }
    if (condition) {
      gs_command(args[2],[]);
    }
  }
};

function interpret_GS(text) {
  let lines = text.split("\n");

  lines.forEach((line) => {
    if (line != "") {
      let tokens = split_p(line);
      let command = tokens[0];
      
      tokens.splice(0,1);
      
      gs_command(command,tokens);
    }
  });
}


// And to test the waters...
interpret_GS(`VAR TEST 5
VAR EXPECTED 10
DEF IT_IS_TEN
OUT "It is 10!"
END DEF
DEF NOT_TEN
OUT "It is not 10."
END DEF
IF_EQ TEST EXPECTED IT_IS_TEN
IF_EQ TEST EXPECTED NOT_TEN ~`);
