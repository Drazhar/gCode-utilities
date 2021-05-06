;
;Start filament change
;
G91 ;Relative positioning
G1 E-2 F2700 ;Retract a bit
G1 E-2 Z0.2 F2400 ;Retract and raise Z
G0 Z20
G90 ;Absolute positionning
G0 X0.5 Y0.5
M106 S0 ;Turn-off fan
M104 S0 ;Turn-off hotend
;M140 S0 ;Turn-off bed
M0 ; Pause
M140 S{{bedTemperature}} ; bed temp
M104 S{{hotendTemperature}} ; nozzle temp
M105
M190 S{{bedTemperature}} ; wait for bed temp
M109 S{{hotendTemperature}} ; wait for nozzle temp
M106 S255 ; SET FAN SPEED
G28 ; AutoHome
G92 E0 ; Reset Extruder
G1 Z2.0 F3000 ; Move Z Axis up little to prevent scratching of Heat Bed
G0 X5   Y7.0 Z0.3 F5000.0 ; Move to start position
G1 X200 Y7.0 Z0.3 F1500.0 E15 ; Draw the first line
G0 X200 Y7.3 Z0.3 F5000.0 ; Move to side a little
G1 X5   Y7.3 Z0.3 F1500.0 E30 ; Draw the second line
G92 E0 ; Reset Extruder
G0 Z2.0 F3000 ; Move Z Axis up little to prevent scratching of Heat Bed
G0 X5 Y20 Z0.3 F5000.0 ; Move over to prevent blob squish
G92 E0
G1 F2700 E-5
G0 Z{{Z1}} ; Back to last Height.
G0 X{{X}} Y{{Y}} Z{{Z}}  ; Go to last Position.
G1 F2700 E0
G92 E{{E}}
;
; Filament change finished
;