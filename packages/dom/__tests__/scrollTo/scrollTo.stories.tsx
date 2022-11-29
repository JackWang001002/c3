import { Button } from '@unstyled-ui/atomic';
import { abs } from '@unstyled-ui/css';
import { Box } from '@unstyled-ui/layout';

export default {
  component: <div></div>,
  title: 'dom/scrollTo',
};

export const Basic = () => {
  return (
    <Box css={{ h: 200 }}>
      <Box css={{ h: 600 }}>
        <Button
          css={{ ...abs({ bottom: 20 }) }}
          onClick={e => {
            scrollTo(0, 0);
          }}
        >
          scroll to here
        </Button>
      </Box>
    </Box>
  );
};
