import React from 'react';



const RenderElement: React.FC = props => {
  const { ...restProps } = props;
  return (
    <div {...restProps}>
      <button
        data-test-id="render"
        onClick={() => {
          // renderElement(<Foo />);
        }}
      >
        render
      </button>
    </div>
  );
};

export default RenderElement;
