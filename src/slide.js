import React from "react";
import animation from "./animation";
import theme from "./nightOwl";
import Scroller from "./scroller";

const themeStylesByType = Object.create(null);
theme.styles.forEach(({ types, style }) => {
  types.forEach(type => {
    themeStylesByType[type] = Object.assign(
      themeStylesByType[type] || {},
      style
    );
  });
});

function getLineHeight(line, i, { styles }) {
  return styles[i].height != null ? styles[i].height : 15;
}

function getLine(line, lineNumber, i, { styles }) {
  const style = styles[i];
  return (
    <div
      style={Object.assign({ overflow: "hidden", height: "15px" }, style)}
      key={line.key}
    >
      <span
        style={{
          minWidth: "40px",
          paddingLeft: "15px",
          paddingRight: "15px",
          textAlign: "right",
          display: "inline-block",
          opacity: 0.4,
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          OUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none"
        }}
      >
        {lineNumber}
      </span>
      {!line.tokens.length && <br />}
      {line.tokens.map((token, i) => {
        const style = themeStylesByType[token.type] || {};
        return (
          <span style={style} key={i}>
            {token.content}
          </span>
        );
      })}
    </div>
  );
}

function Slide({ lines, styles, changes }) {
  return (
    <pre
      style={{
        backgroundColor: theme.plain.backgroundColor,
        color: theme.plain.color,
        paddingTop: "100px",
        margin: 0,
        height: "100%",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      <Scroller
        items={lines}
        getRow={getLine}
        getRowHeight={getLineHeight}
        data={{ styles }}
        snapAreas={changes}
      />
    </pre>
  );
}

export default function SlideWrapper({ time, version }) {
  const { lines, changes } = version;
  const styles = animation((time + 1) / 2, lines);
  return <Slide lines={lines} styles={styles} changes={changes} />;
}
