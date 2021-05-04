import { insertSnippet } from "../src/modules/insertSnippet"

it("should insert the snippet at correct location and return it", () => {
  const inputText = `
;TIME_ELAPSED:8921.804899
;LAYER:80
;TYPE:WALL-INNER
;MESH:DEF.stl
`
  const snippet = "text to insert"
  const expected = `
;TIME_ELAPSED:8921.804899
text to insert
;LAYER:80
;TYPE:WALL-INNER
;MESH:DEF.stl
`

  expect(insertSnippet(inputText, snippet, 80)).toBe(expected)
})
