import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { Container, Form, Row, Col, Button,FormGroup } from 'react-bootstrap';
import { isUserLoggedIn, login } from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { EditorState,convertToRaw} from 'draft-js'
import {Editor} from "react-draft-wysiwyg";
import "../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
/**
* @author
* @function Signin
**/

const NewDetailProduct = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector(state => state.auth);
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
      );
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    

    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email, password
        }

        dispatch(login(user));
    }

 
    const uploadImageCallBack=(e)=>{
        console.log(e.target)
    }
    const handleOnChangeText=value =>{
        setEditorState(value)
    }

    return (
        <Layout>
            <Container>

            <div className='editor'>
            {/* <Editor editorState={editorState} onChange={editorState => setEditorState(editorState)}  
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                /> */}
       
            </div>
            <FormGroup>
                        
                        <Editor
                            editorState={editorState}
                            wrapperClassName="card"
                            editorClassName="card-body"
                            onEditorStateChange={newState => {
                                setEditorState(newState);
                                setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
                            }}
                            toolbar={{
                                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history', 'embedded', 'emoji', 'image'],
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                            }}
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        
                        <div className="border ql-container p-2">
                            <div 
                                dangerouslySetInnerHTML={{
                                    __html: content
                                }} 
                            />
                        </div>
                    </FormGroup>
            </Container>
        </Layout>
    )

}


export default NewDetailProduct