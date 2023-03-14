import React from "react";
import { DotsProps } from "./Dots.props";

export const Dots = ({ total, current, slider }: DotsProps) => {
  const dots = createNumberArray(total - 1);
  function createNumberArray(n: number): number[] {
    const numberArray: number[] = [];

    for (let i = 0; i <= n; i++) {
      numberArray.push(i);
    }
    return numberArray;
  }
  return (
    <ul className="dots">
      {dots.map((d, i) => (
        <li key={i} className="dots__item">
          <button
            onClick={() => slider(i)}
            className={"dots__dot" + (d === current ? " dots__dot-active" : "")}
          ></button>
        </li>
      ))}
    </ul>
  );
};
