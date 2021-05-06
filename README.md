# gCode utilities
This is a collection of scripts I plan to use to modify my gCode files before printing.
This is basically a small project to get some exercise in Typescript and which also has some practical usage.

## Functionality
Right now there are only two functions implemented:
1. Adding a break in the print. This is for example helpful to insert magnets.
2. Adding a breakpoint to change the filament during a print.

## Usage
You can install the package globally by running:
```
npm i -g @drazhar/gcode-utils
```
This enables to use the package directly with ``gcode-utils <options>``
It's also possible to use the utilities directly without installing by utilizing the npm command:
```
npx @drazhar/gcode-utils <options>
```