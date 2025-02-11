# GenericScript 
## GSv5pre-1
GenericScript is a fun esoteric programming language inspired by the C64 BASIC language!<3

## CHANGELOG
- NEW **RETURN COMMAND** ENVIRONMENT e.g: `VAR I #COMMAND:ARG1,ARG2`
- NEW **IF_THEN** RETURN COMMAND
- NEW STRICT KEYWORD FOR IF_EQ and IF_THEN THAT MAKES EQUAL CONDITIONS CASE SENSITIVE

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
OUT %VER
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

**IF_EQ** \<VAR\> \<VAR\> \<FUNC\> \[STRICT|~\] \[~\]: This command compares two variables and sees if they're equal to eachother. If yes it will call a function (usually user-defined) with no arguments. To make it only work if they are NOT equal to eachother just simply add ~ at the end.
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
**IF_THEN** \<VAR\> \<VAR\> \<VAL IF TRUE\> \<VAL IF FALSE\> \[<|>|<=|>=|STRICT\|~] \[~\]: This return command compares two variables and sees if they meet a condition then returns one of the values if true or false.
```gs
VAR TEST 5
VAR TEST2 5
VAR CONDITION #IF_THEN:TEST,TEST2,false,true
OUT %CONDITION
```
THIS COMMAND IS BY NO MEANS STABLE AND IS RECOMMENDED TO REFRAIN FROM USING UNTIL FIXED
