import { Modal} from "@arco-design/web-react";
import {FunctionComponent, useEffect} from "react";
// import ExpandedRowRender1 from "@/pages/FaithFlix/SeriesExpandedRowRender.tsx";
import {useAddSeriesModalStore} from "@/components/UI_Modal/UI_FaithFlixModals/stores/addSeriesModalStore.ts";


interface AddNameAndDescModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const SortEpisodesModal: FunctionComponent<AddNameAndDescModalProps> = ({visible, setVisible}) => {
    const resetEpisodeData = useAddSeriesModalStore((state) => state.resetEpisodeData);

    function handleOk() {
        console.log("ok");
    }

    useEffect(() => {
        if(!visible){
            resetEpisodeData();
        }

// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);


    return (
        <Modal
            title="Sort Episodes"
            visible={visible}
            onOk={handleOk}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
        >
            {/*<ExpandedRowRender1/>*/}
        </Modal>
    );
};
