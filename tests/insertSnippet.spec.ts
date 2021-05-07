import { insertSnippet } from "../src/modules/insertSnippet"

it("should insert the snippet at correct location and return it", () => {
  const inputText = `
;TIME_ELAPSED:8921.804899
;LAYER:80
;TYPE:WALL-INNER
;MESH:DEF.stl
G1 F2700 E3722.57326
G1 F1500 X81.742 Y197.452 E3722.98819
G1 X81.742 Y165.479 E3723.62625
`
  const snippet = "text to insert"
  const expected = `
;TIME_ELAPSED:8921.804899
text to insert
;LAYER:80
;TYPE:WALL-INNER
;MESH:DEF.stl
G1 F1500 X81.742 Y197.452 E3722.98819
G1 X81.742 Y165.479 E3723.62625
`

  expect(insertSnippet(inputText, snippet, 80)).toBe(expected)
})
