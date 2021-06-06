import React, { useEffect, useState } from "react"

// Components
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js"
import { Editor } from "react-draft-wysiwyg"
import draftToHtml from "draftjs-to-html"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "./index.scss"

const WYSIWYGEditor = props => {

  const [editorState, setEditorState] = useState(props.editorDataState)

  const onEditorStateChange = editorState => {
    setEditorState(editorState)
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    )
  }
  
  useEffect(() => {
    setEditorState(props.editorDataState)
  }, [props.editorDataState])

  return (
    <React.Fragment>
      <div >
        <Editor
          key={props.defaultValue}
          editorState={editorState}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
    </React.Fragment>
  )
}

export default WYSIWYGEditor
