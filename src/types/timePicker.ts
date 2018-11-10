import {FormHelperTextProps} from '@material-ui/core/FormHelperText';
import {InputProps} from '@material-ui/core/Input';
import {InputLabelProps} from '@material-ui/core/InputLabel';
import {StyledComponentProps} from '@material-ui/core/styles';

import {ClockProps} from './clock';
import {DatePickerOrigin} from './datePicker';

export interface TimeFormatInputProps extends React.Props<{}>, StyledComponentProps {
  readonly name: string;
  readonly label?: string;
  readonly value: Date;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => void;
  readonly selectableMinutesInterval?: number;
  readonly anchorOrigin?: DatePickerOrigin;
  readonly transformOrigin?: DatePickerOrigin;
  readonly disabled?: boolean;
  readonly error?: string;
  readonly fullWidth?: boolean;
  readonly dialog?: boolean;
  readonly okToConfirm?: boolean;
  readonly endIcon?: Node;
  readonly className?: string;
  readonly InputLabelProps?: InputLabelProps;
  readonly InputProps?: InputProps;
  readonly FormHelperTextProps?: FormHelperTextProps;
  readonly ClockProps?: ClockProps;
}

export interface TimeFormatInputState {
  readonly focus: boolean;
  readonly clockShow: boolean;
}
