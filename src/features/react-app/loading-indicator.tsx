import styled from 'styled-components';

type LoadingIndicatorProps = {
  isVisible: boolean;
};

export const LoadingIndicator = ({ isVisible }: LoadingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <Element>
      <div className='flex justify-center items-center'>
        <Spinner
          className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-amber-700'
          role='status'
        >
          <span className='hidden'>Loading...</span>
        </Spinner>
      </div>
    </Element>
  );
};

const Element = styled.div({
  position: 'fixed',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const Spinner = styled.div({
  borderStyle: 'solid',
  borderBottomColor: 'transparent',
});
