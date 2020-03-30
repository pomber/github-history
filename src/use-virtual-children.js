import React from "react";

export default function useChildren({
  items,
  getRow,
  getRowHeight,
  height,
  top,
  data
}) {
  const children = [];

  const extraRender = 1000;

  const topT = top - extraRender;
  const bottomT = top + height + extraRender;
  let h = 0;

  let topPlaceHolderH = 0;
  let bottomPlaceholderH = 0;

  // This is the bottleneck
  let visibleItemNumber = 1;
  items.forEach((item, i) => {
    const itemH = getRowHeight(item, i, data);
    const nextH = h + itemH;
    const isOverTop = nextH < topT;
    const isUnderBottom = h > bottomT;

    if (isOverTop) {
      topPlaceHolderH += itemH;
    } else if (isUnderBottom) {
      bottomPlaceholderH += itemH;
    } else {
      children.push(getRow(item, visibleItemNumber, i, data));
    }

    // if the middle property is true, the item(line) is shown
    // and the related counter has to be increased by one
    if (item.middle) visibleItemNumber++;

    h = nextH;
  });

  children.unshift(<div style={{ height: topPlaceHolderH }} key="top-ph" />);
  children.push(<div style={{ height: bottomPlaceholderH }} key="bottom-ph" />);
  return children;
}
