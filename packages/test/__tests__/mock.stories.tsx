import { mock } from '../src';
export default {
  component: <div></div>,
  title: 'test/mock',
};
export const Basic = () => {
  return <div>{mock.getRandElements()}</div>;
};
export const Big = () => {
  return <div>{mock.getRandElements({ size: 'big' })}</div>;
};

export const MockImg = () => {
  return (
    <div>
      <img src={mock.getPic()} width="90px" />
      <img src={mock.getCatPic()} width="90px" />
      <img src={mock.getDogPic()} width="90px" />
    </div>
  );
};
