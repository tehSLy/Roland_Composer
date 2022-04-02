import { createStore, Store } from "effector";
import { styled } from "foliage";
import { h, list, route, spec } from "forest";
import { reshape } from "patronum";
import url from "../../../../assets/fonts/kbfont.woff";
import { createToggle } from "../../../lib/createToggle";
import { keymapping } from "../../shared";

const SpecialChars = ["PLUS_SIGN"] as const;
type SpecialChar = typeof SpecialChars[number];
const specialChar = (v: SpecialChar) => v;

export const KeyMapping = () => {
  const $keymap = createStore(keymapping);
  const toggler = createToggle({initial: false});

  SidebarWrapper(() => {
    spec({
      data: {
        isopen: toggler.value,
      },
    });

    OpenButton({
      handler: {
        click: toggler.toggle.prepend(() => null)
      },
      text: toggler.value.map((is) => is ? ">" : "<")
    });
    ListWrapper(() => {
      list($keymap.map(Object.entries), ({ store }) => {
        const { action, keys } = reshape({
          source: store,
          shape: {
            keys: (v) => v[0],
            action: (v) => v[1],
          },
        });

        KeyBindingWrapper(() => {
          KeysWrapper(keys);
          h("span", { text: action });
        });
      });
    });
  });
};

const KeysWrapper = (keys: Store<string>) => {
  const $parts = keys.map((v) =>
    v
      .split("+")
      .join(`,${specialChar("PLUS_SIGN")},`)
      .split(",")
  );
  ShortcutWrapper(() => list($parts, ({ store }) => Key(store)));
};

const Key = (key: Store<string>) => {
  const $parsedKey = key.map((v) => resolveSubstitution(v) || v);
  route({
    source: $parsedKey,
    visible: (v) => !SpecialCharsSubstitutionMap[v],
    fn: ({ store }) =>
      KeyWrapper({ text: store.map((v) => SubstitutionMap[v] || v) }),
  });
  route({
    source: $parsedKey,
    visible: (v) => !!SpecialCharsSubstitutionMap[v],
    fn: ({ store }) =>
      SpecialCharWrapper({
        text: store.map((v) => SpecialCharsSubstitutionMap[v]),
      }),
  });
};

const SidebarWrapper = styled.div`
  position: fixed;
  right: -25rem;
  top: 0px;
  width: 25rem;

  max-height: 100vh;

  background-color: rgba(0, 0, 0, 0.4);
  color: orange;

  transition: right 1s, left 1s;

  display: flex;

  &[data-isopen="true"] {
    right: 0;
  }
`;


const ListWrapper = styled.div`
  overflow-y: auto;
  height: 100%;
`;

const OpenButton = styled.div`
  position: absolute;
  left: calc(-2rem - 1px);
  top: 50%;
  height: 3rem;
  width: 2rem;
  background-color: rgba(0, 0, 0, 0.4);

  border-radius: 0.4rem 0 0 0.4rem;
  cursor: pointer;
  border: solid 1px black;
  border-right:none;

  display: flex;
  align-items: center;
  justify-content: center;

`;

const KeyBindingWrapper = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 2fr;
`;

const KeyWrapper = styled.span`
  @font-face {
    font-family: "KeyboardFont";
    src: url("${url}") format("woff");
  }

  & {
    font-family: "KeyboardFont", Fallback, sans-serif;
    font-size: 2rem;
  }
`;

const ShortcutWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 0.4rem;
`;

const SpecialCharWrapper = styled.span`
  padding: 0px 0.3rem;
  padding-bottom: 0.4rem;
`;

const SubstitutionMap: Record<string, string | ((input: string) => string)> = {
  Shift: "g",
  Space: "w",
  Equal: "=",
  Minus: "-",
  Enter: "a",
  BracketLeft: "[",
  BracketRight: "]",
};

const resolveSubstitution = (input: string) => {
  if (input.startsWith("Digit")) {
    return input.split("Digit")[1];
  }

  if (input.startsWith("Key")) {
    return input.split("Key")[1];
  }
  return typeof SubstitutionMap[input] === "function"
    ? SubstitutionMap[input](input)
    : SubstitutionMap[input];
};

const SpecialCharsSubstitutionMap = {
  PLUS_SIGN: "+",
};
