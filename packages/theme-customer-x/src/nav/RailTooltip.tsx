import { useSidebarOpenState } from '@backstage/core-components';
import { Tooltip } from '@material-ui/core';
import { ReactElement } from 'react';

export interface RailTooltipProps {
  title: string;
  children: ReactElement;
}

/**
 * Labels a rail control while the sidebar is collapsed (when its own text is
 * hidden) and gets out of the way when it is open.
 */
export const RailTooltip = ({ title, children }: RailTooltipProps) => {
  const { isOpen } = useSidebarOpenState();
  return isOpen ? (
    children
  ) : (
    <Tooltip title={title} placement="right" enterDelay={300}>
      {children}
    </Tooltip>
  );
};
