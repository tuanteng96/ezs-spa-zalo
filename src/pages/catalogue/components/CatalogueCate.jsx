import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import React, { useContext, useState } from "react"
import {
  ScrollMenu,
  VisibilityContext,
  getItemsPos,
  slidingWindow
} from "react-horizontal-scrolling-menu";
import 'react-horizontal-scrolling-menu/dist/styles.css';
import { createSearchParams } from "react-router-dom";
import { useNavigate } from "zmp-ui";
import AdvAPI from "../../../api/adv.api";
import ProdsAPI from "../../../api/prods.api";
import { useDrag } from "../../../hook";
import { formatString } from "../../../utils/formatString";

function onWheel(
  { getItemById, items, visibleItems, scrollToItem },
  ev) {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    // NOTE: for center items
    const nextGroupItems = slidingWindow(
      items.toItemsKeys(),
      visibleItems
    ).next();
    const { center } = getItemsPos(nextGroupItems);
    scrollToItem(getItemById(center), "smooth", "center");
  } else if (ev.deltaY > 0) {
    const prevGroupItems = slidingWindow(
      items.toItemsKeys(),
      visibleItems
    ).prev();
    const { center } = getItemsPos(prevGroupItems);
    scrollToItem(getItemById(center), "smooth", "center");
  }
}

const Item = ({
  itemId,
  selected,
  onClick,
  item
}) => {
  const visibility = useContext(VisibilityContext);
  const visible = visibility.isItemVisible(itemId);

  return (
    <div
      onClick={() => onClick(visibility)}
      className="px-3"
    >
      <div className={clsx("whitespace-nowrap h-12 flex items-center", selected && "text-app")}>{item.Title}</div>
    </div>
  )
}

const CatalogueCate = ({ queryConfig }) => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ['CatalogueCate', queryConfig.TypeID],
    queryFn: async () => {
      const { data } = await ProdsAPI.cateParentID({ id: queryConfig.TypeID })
      return data ? [{ Title: "Tất cả", Id: "", ID: "" }, ...data?.map(x => ({ ...x, Id: x.ID }))] : []
    },
    enabled: queryConfig.TypeID === "794" || queryConfig.TypeID === "795"
  })
  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleDrag = ({ scrollContainer }) => (
    ev
  ) =>
    dragMove(ev, (posDiff) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });

  const handleItemClick = (itemId) => ({
    getItemById,
    scrollToItem
  }) => {
    if (dragging) {
      return false;
    }
    scrollToItem(getItemById(itemId), "smooth", "center", "nearest");
    navigate({
      pathname: '/catalogue',
      search: createSearchParams({
        TypeID: queryConfig.TypeID,
        CateID: itemId,
      }).toString()
    })
  };

  const onInit = ({ getItemById, scrollToItem }) => {
    if (queryConfig.TypeID) {
      scrollToItem(getItemById(queryConfig.TypeID), "smooth", "center", "nearest");
    }
  }

  if (queryConfig.TypeID !== "794" && queryConfig.TypeID !== "795") {
    return <></>
  }

  return (
    <div className="bg-white border-t" onMouseLeave={dragStop}>
      <ScrollMenu
        scrollContainerClassName="no-scrollbar"
        onInit={onInit}
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={({
          getItemById,
          scrollToItem,
          visibleItems
        }) => () => {
          dragStop();
          const { center } = getItemsPos(visibleItems);
          scrollToItem(getItemById(center), "smooth", "center");
        }}
        options={{ throttle: 0 }}
        onMouseMove={handleDrag}
      >
        {data && data.map((item, index) => (
          <Item
            itemID={item.Id}
            key={item.Id}
            onClick={handleItemClick(item.Id)}
            selected={item.Id === (queryConfig.CateID ? Number(queryConfig.CateID) : queryConfig.CateID)}
            item={item}
          />
        ))}
      </ScrollMenu>
    </div>
  )
}

export { CatalogueCate }