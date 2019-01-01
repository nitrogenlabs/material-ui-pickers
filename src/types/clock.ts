/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {StyledComponentProps} from '@material-ui/core/styles';

export interface ClockProps extends React.Props<{}>, StyledComponentProps {
  readonly action: (actions: any) => void;
  readonly value: Date;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
  readonly closeClock: () => void;
  readonly selectableMinutesInterval?: number;
  readonly okToConfirm?: boolean;
  readonly classes?: {
    root?: string
    digitalContainer?: string
    clockBackground?: string
    hand?: string
    textSelected?: string
    minuteDotSelected?: string
  };
}

export interface ClockState {
  readonly mode: 'hour' | 'minute';
  readonly selected: Date;
  readonly selecting: boolean;
  readonly clockRadius: number;
}
