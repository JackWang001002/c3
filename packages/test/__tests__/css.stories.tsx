import { Col, Row } from '@unstyled-ui/layout';
import { showtip } from '../src/css';

export default {
  component: <div></div>,
  title: 'test/css',
};

//=====================================================================================================
//
//=====================================================================================================
const base = {
  background: 'blue',
  w: 200,
  h: 50,
};

export const Basic = () => {
  return (
    <Col css={{ gap: 20 }}>
      <Row css={{ ...base, ...showtip('bottom') }} data-tip="bottom"></Row>
      <Row css={{ ...base, ...showtip('left') }} data-tip="left"></Row>
      <Row css={{ ...base, ...showtip('top') }} data-tip="top"></Row>
      <Row css={{ ...base, ...showtip('right') }} data-tip="right"></Row>
      <Row css={{ ...base, ...showtip('center') }} data-tip="center"></Row>
    </Col>
  );
};
