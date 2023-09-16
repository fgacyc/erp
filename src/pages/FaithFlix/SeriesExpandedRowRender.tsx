// import {useEffect, useState} from "react";
// import {Table, TableColumnProps} from "@arco-design/web-react";
// import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
// import {useAddSeriesModalStore} from "@/components/UI_Modal/UI_FaithFlixModals/stores/addSeriesModalStore.ts";
// import {IconDragDotVertical} from "@arco-design/web-react/icon";
// import {EpisodeData} from "@/pages/FaithFlix/SeriesManagement.tsx";
//
// const arrayMoveMutate = (array:EpisodeData[], from:number, to:number) => {
//     const startIndex = to < 0 ? array.length + to : to;
//
//     if (startIndex >= 0 && startIndex < array.length) {
//         const item = array.splice(from, 1)[0];
//         if(!item) return;
//         array.splice(startIndex, 0, item);
//     }
// };
//
// const arrayMove = (array:EpisodeData[], from:number, to:number) => {
//     array = [...array];
//     arrayMoveMutate(array, from, to);
//     return array;
// };
//
//
// const columns: TableColumnProps[] =[
//     // {
//     //     title: "Episode Number",
//     //     dataIndex: "episode_number",
//     // },
//     {
//         title: "Video Title",
//         dataIndex: "video_title",
//     },
// ];
//
// const DragHandle = SortableHandle(() => (
//     <IconDragDotVertical
//         style={{
//             cursor: "move",
//             color: "#555",
//         }}
//     />
// ));
//
//
// const SortableWrapper = SortableContainer((props) => {
//     return <tbody {...props} />;
// });
// const SortableItem = SortableElement((props) => {
//     return (
//         <tr
//             style={{
//                 cursor: "move",
//             }}
//             {...props}
//         />
//     );
// });
//
// interface OnsortEndData{
//     oldIndex: number;
//     newIndex: number;
// }
//
// function ExpandedRowRender1() {
//     const [episodeData, isUpdate] = useAddSeriesModalStore((state) => [state.episodeData, state.isUpdate]);
//     const [data, setData] = useState<EpisodeData[]>(episodeData!.videos);
//
//     useEffect(() => {
//         if(!isUpdate) return;
//         setData(episodeData!.videos);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [isUpdate]);
//
//     function onSortEnd(sortEndData:OnsortEndData) {
//         const { oldIndex, newIndex } = sortEndData;
//         if (oldIndex !== newIndex) {
//             // eslint-disable-next-line react-hooks/exhaustive-deps
//             const newData = arrayMove([].concat(data), oldIndex, newIndex).filter((el) => !!el);
//             console.log("New Data: ", newData);
//             setData(newData);
//         }
//     }
//
//     const DraggableContainer = (props) => (
//         <SortableWrapper
//             onSortEnd={onSortEnd}
//             helperContainer={() => document.querySelector(".arco-drag-table-container table tbody")}
//             updateBeforeSortStart={({ node }) => {
//                 const tds = node.querySelectorAll("td");
//                 tds.forEach((td) => {
//                     td.style.width = td.clientWidth + "px";
//                 });
//             }}
//             {...props}
//         />
//     );
//
//     const DraggableRow = (props) => {
//         const { record, index, ...rest } = props;
//         return <SortableItem index={index} {...rest} />;
//     };
//
//     const components = {
//         header: {
//             operations: ({ selectionNode, expandNode }) => [
//                 {
//                     node: <th />,
//                     width: 40,
//                 },
//                 {
//                     name: "expandNode",
//                     node: expandNode,
//                 },
//                 {
//                     name: "selectionNode",
//                     node: selectionNode,
//                 },
//             ],
//         },
//         body: {
//             operations: ({ selectionNode }) => [
//                 {
//                     node: (
//                         <td>
//                             <div className='arco-table-cell'>
//                                 <DragHandle />
//                             </div>
//                         </td>
//                     ),
//                     width: 40,
//                 },
//                 {
//                     name: "selectionNode",
//                     node: selectionNode,
//                 },
//             ],
//             tbody: DraggableContainer,
//             row: DraggableRow,
//         },
//     };
//     return (
//         <Table
//             className='arco-drag-table-container'
//             components={components}
//             columns={columns}
//             data={data}
//         />
//     );
// }
//
// export default ExpandedRowRender1;
