# GenericScript 
## GSv4
GenericScript is a fun esoteric programming language inspired by the C64 BASIC language!<3

## CHANGELOG
- added IF_EQ

## COMMANDS
There are only 6 commands as of now, but more will be added in the future
Due to the javascript curse there is no future for a file management system

**OUT** \<Text\>: Prints out text. put the % symbol before the text to reference a variable
You must surround any arg with a space in double quotes to prevent it getting split.
EXAMPLES:
```gs
OUT "Hello, World!"
```
```gs
OUT %version
```

**VAR** \<Var\> \<Val\>: Assigns a variable to a value, or to another variable's value if "Val" arg starts with %
EXAMPLES:
```gs
VAR I 10
OUT %I
```
```gs
VAR I "I have not tested strings yet."
OUT %I
OUT "Let me know if they work"
```

**DEF** \<Name\>: Defines a new argument-less command, all the commands before **END DEF** will be used to make the command instead of them running already.
```gs
VAR I 5
DEF SET_I_TO_10
VAR I 10
END DEF
DEF REVERT_I
VAR I 5
END DEF
OUT %I
SET_I_TO_10

```

**END** \<CMD\>: What do you think it does?

**CONCAT** \<VAR\> \<STR/VAR\> []: Concatenates a variable with either a string or another variable. The third argument determines how it would be concatenated,
\-S for a space and \-\<CHAR\> for any character, though optional and if not available concatenate without any form of seperation
```gs
VAR I "Hello,"
CONCAT I %VER -S
OUT %I
```

IF_EQ HAS NOT BEEN TESTED AND SHOULD NOT BE USED UNLESS CONFIRMED TO WORK
**IF_EQ** \<VAR\> \<VAR\> \<FUNC\> \[~\]: This command compares two variables and sees if they're equal to eachother. If yes it will call a function (usually user-defined) with no arguments. To make it only work if they are NOT equal to eachother just simply add ~ at the end.
```gs
VAR TEST 5
VAR EXPECTED 10
DEF IT_IS_TEN
OUT "It is 10!"
END DEF
DEF NOT_TEN
OUT "It is not 10."
END DEF
IF_EQ TEST EXPECTED IT_IS_TEN
IF_EQ TEST EXPECTED NOT_TEN ~
```
Please note i've performed this update using my phone and it is not tested. Please test before you use it, thanks!<3
