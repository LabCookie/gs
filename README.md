# GenericScript 
## GSv3
GenericScript is a fun esoteric programming language inspired by the C64 BASIC language!<3

## CHANGELOG
- removed EP
- added CONCAT
- added new variable VER to determine version (version can still be used until GSv6) 

## COMMANDS
There are only 5 commands as of now, but more will be added in the future
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
