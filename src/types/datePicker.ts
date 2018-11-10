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
  readonly name: string;
  readonly label?: string;
  readonly value: Date;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement>) => void;
  readonly anchorOrigin?: DatePickerOrigin;
  readonly transformOrigin?: DatePickerOrigin;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly dateDisabled?: (date: Date) => boolean;
  readonly min?: Date;
  readonly max?: Date;
  readonly dateFormat?: string | ((date: Date) => string);
  readonly fullWidth?: boolean;
  readonly dialog?: boolean;
  readonly okToConfirm?: boolean;
  readonly endIcon?: Node;
  readonly className?: string;
  readonly InputLabelProps?: InputLabelProps;
  readonly InputProps?: InputProps;
  readonly FormHelperTextProps?: FormHelperTextProps;
  readonly CalendarProps?: CalendarProps;
}

export interface DateFormatInputState {
  readonly focus: boolean;
  readonly calendarShow: boolean;
}
