import { Store } from "effector";
import { styled } from "foliage";
import { clearColor } from "../shared";
import { clearColorString } from "../shared/palette";

type Config = {
  isVisible: Store<boolean>;
};

export const LoadingIndicator = ({ isVisible }: Config) => {
  Element({
    visible: isVisible,
    style: {
      backgroundColor: clearColorString,
    },
    text: "Loading..."
  });
};

const Element = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

console.log(clearColor);
