# gCode utilities
This is a collection of scripts I plan to use to modify my gCode files before printing. I'm happy for any suggestion 😃

## Functionality
Right now there are only two functions implemented:
1. Pause for adding a break in the print. This is to insert magnets or similar into the print.
2. filamentChange for adding a breakpoint to change the filament during a print.

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

## Options
The following options are implemented:
- ``--input | -i``: gCode file to modify, relative to the current filepath.
- ``--output | -o``: Name of the output. It will be saved at the same location as the inputfile.
- ``--type | -t``: What to add to the gCode. The only options are ``pause`` or ``filamentChange``.
- ``--layer | -l``: Layer before which the break should be added. The layer numbering in Cura start by 1, but in the file with 0. So if you want to add the break after the currently visible layer in cura, you can add the displayed number from Cura.

If you don't specify any or all of the inputs, you will be prompted automatically. So it's perfectly valid to simply run ``npx @drazhar/gcode-utils`` without any options.

## Example usage
![Example usage](https://user-images.githubusercontent.com/3040689/117360411-0cb05e80-aeb9-11eb-876e-64311f448e11.jpg)
