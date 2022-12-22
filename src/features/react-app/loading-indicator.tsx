import styled from 'styled-components';

type LoadingIndicatorProps = {
  isVisible: boolean;
};

export const LoadingIndicator = ({ isVisible }: LoadingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <Wrapper>
      <div className='flex justify-center items-center'>
        <Spinner
          className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-amber-700'
          role='status'
        >
          <span className='hidden'>Loading...</span>
        </Spinner>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  border-style: solid;
  border-bottom-color: transparent;
`;
