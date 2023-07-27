import { PropsWithChildren } from 'react';
import Style from './Main.style';

const Main = ({ children }: PropsWithChildren) => {
  return <Style.Container>{children}</Style.Container>;
};

export default Main;
