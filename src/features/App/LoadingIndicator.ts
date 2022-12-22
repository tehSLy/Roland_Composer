import { Store } from 'effector';
import { styled } from 'foliage';
import { h } from 'forest';

type Config = {
  isVisible: Store<boolean>;
};

export const LoadingIndicator = ({ isVisible }: Config) => {
  Element({
    visible: isVisible,
    // style: {
    //   backgroundColor: clearColorString,
    // },
    // text: "Loading...",
    fn() {
      h('div', {
        attr: {
          class: 'flex justify-center items-center',
        },
        fn() {
          h('div', {
            attr: {
              class:
                'spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-amber-700',
              role: 'status',
            },
            style: {
              borderStyle: 'solid',
              borderBottomColor: 'transparent',
            },
            fn() {
              h('span', {
                text: 'Loading...',
                attr: {
                  class: 'hidden',
                },
              });
            },
          });
        },
      });
    },
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
