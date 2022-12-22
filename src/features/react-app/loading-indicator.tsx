type LoadingIndicatorProps = {
  isVisible: boolean;
};

export const LoadingIndicator = ({ isVisible }: LoadingIndicatorProps) => {
  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='flex justify-center items-center'>
        <div
          className='spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-amber-700'
          style={{
            borderStyle: 'solid',
            borderBottomColor: 'transparent',
          }}
          role='status'
        >
          <span className='hidden'>Loading...</span>
        </div>
      </div>
    </div>
  );
};
