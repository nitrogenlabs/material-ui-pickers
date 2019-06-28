/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FormHelperTextProps} from '@material-ui/core/FormHelperText';
import {InputProps} from '@material-ui/core/Input';
import {InputLabelProps} from '@material-ui/core/InputLabel';
import {StyledComponentProps} from '@material-ui/core/styles';

import {ClockProps} from './clock';
import {DatePickerOrigin} from './datePicker';

export interface TimeFormatInputProps extends React.Props<{}>, StyledComponentProps {
  readonly anchorOrigin?: DatePickerOrigin;
  readonly className?: string;
  readonly clockProps?: ClockProps;
  readonly dialog?: boolean;
  readonly disabled?: boolean;
  readonly endIcon?: Node;
  readonly error?: string;
  readonly formHelperTextProps?: FormHelperTextProps;
  readonly fullWidth?: boolean;
  readonly inputLabelProps?: InputLabelProps;
  readonly inputProps?: InputProps;
  readonly label?: string;
  readonly name: string;
  readonly okToConfirm?: boolean;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
  readonly selectableMinutesInterval?: number;
  readonly transformOrigin?: DatePickerOrigin;
  readonly value: Date;
}

export interface TimeFormatInputState {
  readonly focus: boolean;
  readonly clockShow: boolean;
}
