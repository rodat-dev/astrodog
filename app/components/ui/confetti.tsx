import React from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function ConfettiCannon({ hidden }: { hidden: boolean }) {
  const { width, height } = useWindowSize();
  return <Confetti hidden={hidden} width={width} height={height} />;
}
