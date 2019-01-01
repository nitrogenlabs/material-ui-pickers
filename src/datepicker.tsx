/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Popover from '@material-ui/core/Popover';
import {StyleRules, withStyles} from '@material-ui/core/styles';
import Today from '@material-ui/icons/Today';
import {DateTime} from 'luxon';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Calendar} from './Calendar';
import {DateFormatInputProps, DateFormatInputState} from './types/datePicker';

const styles = (): StyleRules => ({
  formControl: {
    cursor: 'pointer'
  },
  input: {
    height: '19px',
    maxWidth: '100%',
    overflow: 'hidden',
    padding: '6px 0 7px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '180px'
  },
  label: {
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

export class DateFormatInputBase extends React.Component<DateFormatInputProps, DateFormatInputState> {
  action: any = {}
  input: Element
  calendar: Element
  constructor(props: DateFormatInputProps) {
    super(props);

    // Methods
    this.closeCalendar = this.closeCalendar.bind(this);
    this.dateValue = this.dateValue.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onWindowClick = this.onWindowClick.bind(this);
    this.toggleShowCalendar = this.toggleShowCalendar.bind(this);

    // Get current date
    // const now = new Date();
    // let date = new Date(now.getTime());
    // const {min, max} = props;

    // if(max && now.getTime() > max.getTime()) {
    //   date = new Date(max.getTime());
    // } else if(min && now.getTime() < min.getTime()) {
    //   date = new Date(min.getTime());
    // }
    this.state = {
      calendarShow: false,
      focus: false
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
  }

  componentDidUpdate(prevProps, prevState) {
    if((prevProps.value && prevProps.value.getTime()) !==
      (this.props.value && this.props.value.getTime()) && prevState.calendarShow) {
      this.closeCalendar();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick(event: MouseEvent) {
    if([this.input, this.calendar].reduce((contain, next) =>
      contain && (!next || next.compareDocumentPosition(event.target as Node) < 16), true)) {
      this.closeCalendar();
    }
  }

  onFocus(focus: boolean) {
    this.setState({focus});
  }

  toggleShowCalendar() {
    const {calendarShow} = this.state;
    this.setState({calendarShow: !calendarShow});
  }

  closeCalendar() {
    this.setState({calendarShow: false});
  }

  dateValue(date: Date) {
    const {dateFormat = 'EEE, MMMM d, yyyy'} = this.props;

    if(typeof dateFormat === 'function') {
      return dateFormat(date);
    }

    return DateTime.fromJSDate(date).toFormat(dateFormat);
  }

  render() {
    const {
      anchorOrigin,
      calendarProps,
      dialog,
      classes,
      className,
      dateDisabled,
      disabled,
      endIcon,
      error,
      formHelperTextProps,
      inputLabelProps,
      inputProps,
      label,
      max,
      min,
      name,
      okToConfirm,
      onChange,
      transformOrigin,
      value
    } = this.props;
    const {focus, calendarShow} = this.state;
    const updatedCalendarProps = {
      ref: (calendar) => this.calendar = ReactDOM.findDOMNode(calendar) as Element,
      value, onChange, dateDisabled, min, max,
      closeCalendar: this.closeCalendar, okToConfirm,
      ...calendarProps
    };
    return ([
      <div key='date-input' className={className} ref={(input) => this.input = input}>
        <FormControl
          className={classes.formControl}
          disabled={disabled}
          error={error !== undefined}
          fullWidth
          onClick={this.toggleShowCalendar} >
          {label && <InputLabel shrink={focus || calendarShow || value !== undefined} htmlFor={name}
            {...{
              ...inputLabelProps,
              classes: inputLabelProps && inputLabelProps.classes ? {
                root: classes.label, ...inputLabelProps.classes
              } : {root: classes.label}
            }}>
            {label}
          </InputLabel>}
          <Input name={name} value={value ? this.dateValue(value) : '\u00a0'}
            onFocus={() => this.onFocus(true)}
            onBlur={() => this.onFocus(false)}
            inputComponent={({value}) => <div className={classes.input}>{value}</div>}
            endAdornment={<InputAdornment position='end'>
              <IconButton onMouseDown={(event) => event.preventDefault()}>
                {endIcon ? endIcon : <Today />}
              </IconButton>
            </InputAdornment>}
            {...inputProps}
          />
          {error && <FormHelperText error {...formHelperTextProps}>{error}</FormHelperText>}
        </FormControl>
      </div>,
      dialog ?
        <Dialog key='date-dialog' open={calendarShow} onClose={this.closeCalendar}>
          <Calendar {...updatedCalendarProps} />
        </Dialog> :
        <Popover
          anchorEl={this.input as any}
          anchorOrigin={anchorOrigin}
          key='date-popover'
          onEntered={() => {
            if(this.action.resize) {
              this.action.resize();
            }
          }}
          open={calendarShow}
          transformOrigin={transformOrigin} >
          <Calendar action={(action) => this.action.resize = action.resize} {...updatedCalendarProps} />
        </Popover>
    ]);
  }
}

export const DateFormatInput = withStyles(styles)(DateFormatInputBase);
export default DateFormatInput;
