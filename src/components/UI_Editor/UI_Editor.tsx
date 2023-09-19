import {FunctionComponent} from "react";
import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";




interface AddReviewsModalProps {
    setMdText: (text: string) => void;
    width?: string;
    height?: string;
}

export const UI_Editor: FunctionComponent<AddReviewsModalProps> = ({setMdText,width,height}) => {
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    function renderHTML(text:string) {
        setMdText(text);
        return mdParser.render(text);
    }

    return (
        <MdEditor style={{
            height: height || "550px" ,
            width: width || "600px"
        }} renderHTML={text => renderHTML(text)}   />
    );
};
