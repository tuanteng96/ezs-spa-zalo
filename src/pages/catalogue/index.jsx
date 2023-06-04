import React from "react";
import { Icon, Page, useNavigate, Text, Tabs } from "zmp-ui";
import {
  ScrollMenu,
  VisibilityContext,
  getItemsPos,
  slidingWindow
} from "react-horizontal-scrolling-menu";
import 'react-horizontal-scrolling-menu/dist/styles.css';

const CataloguePage = () => {
  const navigate = useNavigate();

  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleDrag = ({ scrollContainer }) => (
    ev
  ) =>
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });

  const [selected, setSelected] = React.useState();
  const handleItemClick = (itemId) => ({
    getItemById,
    scrollToItem
  }) => {
    if (dragging) {
      return false;
    }
    setSelected(selected !== itemId ? itemId : "");
    scrollToItem(getItemById(itemId), "smooth", "center", "nearest");
  };

  return (
    <Page className="page" hideScrollbar>
      <div className="navbar fixed top-0 left-0 min-w-[100vw] max-w-[100vw] z-[999] bg-white">
        <div className="w-2/3 relative flex items-center h-full pl-10">
          <div className="absolute left-0 w-10 h-full flex justify-center items-center cursor-pointer" onClick={() => navigate(-1)}>
            <Icon icon="zi-chevron-left-header" className="text-app" />
          </div>
          <Text.Title className="text-app">Danh mục</Text.Title>
        </div>
      </div>
      <div onMouseLeave={dragStop}>
        <ScrollMenu
          onWheel={onWheel}
          onMouseDown={() => dragStart}
          onMouseUp={({
            getItemById,
            scrollToItem,
            visibleItems
          }) => () => {
            // NOTE: for center items
            dragStop();
            const { center } = getItemsPos(visibleItems);
            scrollToItem(getItemById(center), "smooth", "center");
          }}
          options={{ throttle: 0 }} // NOTE: for center items
          onMouseMove={handleDrag}
        >
          {Array(8).fill().map((_, index) => (
            <div
              key={index}
              onClick={handleItemClick(index)}
              selected={id === selected}
            >
              Item {index}
            </div>
          ))}
        </ScrollMenu>
      </div>
    </Page>
  )
}
export default CataloguePage