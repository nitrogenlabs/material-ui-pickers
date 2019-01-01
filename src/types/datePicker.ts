/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {FormHelperTextProps} from '@material-ui/core/FormHelperText';
import {InputProps} from '@material-ui/core/Input';
import {InputLabelProps} from '@material-ui/core/InputLabel';
import {StyledComponentProps} from '@material-ui/core/styles';

import {CalendarProps} from './calendar';

export interface DatePickerOrigin {
  readonly vertical: 'top' | 'center' | 'bottom';
  readonly horizontal: 'left' | 'center' | 'right';
}

export interface DateFormatInputProps extends React.Props<{}>, StyledComponentProps {
  readonly anchorOrigin?: DatePickerOrigin;
  readonly calendarProps?: CalendarProps;
  readonly className?: string;
  readonly dateDisabled?: (date: Date) => boolean;
  readonly dateFormat?: string | ((date: Date) => string);
  readonly dialog?: boolean;
  readonly disabled?: boolean;
  readonly endIcon?: Node;
  readonly error?: string;
  readonly formHelperTextProps?: FormHelperTextProps;
  readonly fullWidth?: boolean;
  readonly inputLabelProps?: InputLabelProps;
  readonly inputProps?: InputProps;
  readonly label?: string;
  readonly min?: Date;
  readonly max?: Date;
  readonly name: string;
  readonly okToConfirm?: boolean;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement>) => void;
  readonly transformOrigin?: DatePickerOrigin;
  readonly value: Date;
}

export interface DateFormatInputState {
  readonly focus: boolean;
  readonly calendarShow: boolean;
}
