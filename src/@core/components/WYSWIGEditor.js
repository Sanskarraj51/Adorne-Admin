import { EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { useState } from 'react'
import ReactDraftWysiwyg from 'src/@core/components/react-draft-wysiwyg'
import { convertToRawEditorState } from '../api-handler'
import { useEffect } from 'react'

const WYSWIGEditor = ({ className, value, title, previewVal, sx, id, onChange, ...other }) => {
  const [editorValue, setEditorValue] = useState(EditorState.createEmpty())

  function handleChange(data) {
    setEditorValue(data)
    let htmVal = draftToHtml(convertToRaw(data.getCurrentContent()))
    onChange(htmVal)
  }

  useEffect(() => {
    if (previewVal) {
      setEditorValue(convertToRawEditorState(previewVal))
    }
  }, [previewVal])

  return (
    <ReactDraftWysiwyg
      editorStyle={{
        border: '1px solid #ddd',
        paddingLeft: '5px',
        borderRadius: '5px',
        minHeight: '6rem'
      }}
      editorState={editorValue}
      onEditorStateChange={data => handleChange(data)}
      {...other}
    />
  )
}

export default WYSWIGEditor
