import tw from "tailwind-styled-components";

type LoadingIndicatorProps = {
  isVisible: boolean;
};

export const LoadingIndicator = ({ isVisible }: LoadingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <Wrapper>
      <Spinner role="status" />
    </Wrapper>
  );
};

const Wrapper = tw.div`
  flex
  justify-center
  items-center
  fixed
  w-full
  h-full
`;

const Spinner = tw.div`
  w-8
  h-8
  border-solid
  border-amber-700
  border-b-transparent
  border-4
  spinner-border
  animate-spin
  inline-block
  rounded-full
`;
