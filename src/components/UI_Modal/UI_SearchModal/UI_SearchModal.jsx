import {Modal} from "@arco-design/web-react";
import "./UI_SearchModal.css"
import {IconSearch, IconSwap, IconUndo} from "@arco-design/web-react/icon";
import { ReactComponent as IconEnter } from '/src/assets/icon-enter.svg'

export  default  function UI_SearchModal({visible, setVisible}){
    return (
        <Modal
            alignCenter={false}
            className={"notification-modal"}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            mask = {true}
            simple = {true}
            footer = {null}
            style={{width: 600,height:750, borderRadius: 5}}
        >
            <div className="search-modal-con">
                <div className="search-modal-header">
                    <IconSearch className="search-modal-icon"  />
                    <input type="text" placeholder="Type to Search..." className="search-modal-input"/>
                </div>
                <div className="search-modal-body">

                </div>
                <div className="search-modal-footer">
                   <span style={{marginRight:10}}><IconSwap className="search-modal-footer-select"/> Select</span>
                    <span><IconEnter className="search-modal-footer-enter" /> Enter</span>
                </div>
            </div>
        </Modal>
    )
}