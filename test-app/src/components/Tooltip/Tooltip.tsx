import React, { createRef, Fragment, useState } from 'react';
import styled from 'styled-components';

import Portal from '../modal/ModalPortal';

type PositionType = {
  left: number;
  top: number;
};

const Container = styled.div<{ position: PositionType }>`
  ${({ position: { top, left }, theme: { colors } }) => `
    position: absolute;
    top: ${top}px;
    left: ${left}px;
    width: 220px;
    padding: 15px;
    color: ${colors.white};
    background-color: ${colors.violet};
    font-weight: 700;
    font-size: 13px;
    line-height: 1.3rem;
    cursor: default;

    &::before {
      content: '';
      position: absolute;
      top: -15px;
      left: 0;
      width: 0;
      height: 0;
      border-bottom: 15px solid ${colors.violet};
      border-right: 15px solid transparent;
    }
  `}
`;

export type TooltipHandlerProps = {
  ref: React.RefObject<HTMLDivElement>;
  show: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLDivElement>) => void;
};

type Props = {
  id: string;
  content: string;
  children: JSX.Element | ((props: TooltipHandlerProps) => React.ReactNode);
};

const Tooltip: React.FC<Props> = ({
  id,
  content,
  children,
}) => {
  const [show, setShow] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [position, setPosition] = useState<PositionType>({
    left: 20,
    top: 20,
  });
  const visible = freeze ? true : show;

  const handler = createRef<HTMLDivElement>();

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setFreeze(!freeze);
  };

  const onMouseEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(true);
  }

  const onMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow(false);
  }

  const getTooltipProps = () => {
    return {
      ref: handler,
      show: freeze,
      onClick,
      onMouseEnter,
      onMouseLeave,
    };
  };

  const positionTooltip = () => {
    if (!handler.current) return undefined;

    const offset = 20;
    const handlerRect = handler.current.getBoundingClientRect();
    const { top, left, width, height } = handlerRect;

    return setPosition({
      top: top + height + offset,
      left: left + width/2,
    })
  };

  return (
    <Fragment>
      {typeof children === 'function' ? (
        children(getTooltipProps())
      ) : (
        <div {...getTooltipProps()}>{children}</div>
      )}
      {visible && content && (
        <Portal key={`tooltip-content-${id}`} onMount={positionTooltip}>
          <Container position={position}>
            {content}
          </Container>
        </Portal>
      )}
    </Fragment>
  );
}

export default Tooltip;
