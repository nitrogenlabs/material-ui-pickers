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
import AccessTime from '@material-ui/icons/AccessTime';
import {DateTime} from 'luxon';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Clock from './clock';
import {TimeFormatInputProps, TimeFormatInputState} from './types/timePicker';

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

export class TimeFormatInputBase extends React.Component<TimeFormatInputProps, TimeFormatInputState> {
  action: any = {};
  input: Element | Text;
  clock: Element | Text;

  constructor(props) {
    super(props);

    // Methods
    this.closeClock = this.closeClock.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onWindowClick = this.onWindowClick.bind(this);
    this.toggleShowClock = this.toggleShowClock.bind(this);

    // Get default date
    // const now: Date = new Date();
    // const {min, max} = props;

    // let date: Date = new Date(now.getTime());

    // if(max && now.getTime() > max.getTime()) {
    //   date = new Date(max.getTime());
    // } else if(min && now.getTime() < min.getTime()) {
    //   date = new Date(min.getTime());
    // }

    // Initial state
    this.state = {
      clockShow: false,
      focus: false
    };
  }

  componentDidMount() {
    window.addEventListener('click', this.onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick(event: MouseEvent) {
    if([this.input, this.clock].reduce((contain, next) =>
      contain && (!next || next.compareDocumentPosition(event.target as Node) < 16), true)) {
      this.closeClock();
    }
  }

  onFocus(focus: boolean) {
    this.setState({focus});
  }

  toggleShowClock() {
    const {clockShow} = this.state;
    this.setState({clockShow: !clockShow});
  }

  closeClock() {
    this.setState({clockShow: false});
  }

  render() {
    const {
      anchorOrigin,
      classes,
      className,
      clockProps,
      dialog,
      disabled,
      endIcon,
      error,
      inputLabelProps,
      inputProps,
      formHelperTextProps,
      label,
      name,
      okToConfirm,
      onChange,
      selectableMinutesInterval,
      transformOrigin,
      value
    } = this.props;
    const {focus, clockShow} = this.state;

    return ([
      <div key='date-input' className={className} ref={(input) => this.input = ReactDOM.findDOMNode(input)}>
        <FormControl
          className={classes.formControl}
          disabled={disabled}
          error={error !== undefined}
          fullWidth
          onClick={this.toggleShowClock}>
          {label && <InputLabel shrink={focus || clockShow || value !== undefined} htmlFor={name}
            {...{
              ...inputLabelProps,
              classes: inputLabelProps && inputLabelProps.classes ? {
                root: classes.label,
                ...inputLabelProps.classes
              } : {root: classes.label}
            }}>
            {label}
          </InputLabel>}
          <Input name={name} value={value ? DateTime.fromJSDate(value).toFormat('h:mm a') : '\u00a0'}
            onFocus={() => this.onFocus(true)}
            onBlur={() => this.onFocus(false)}
            inputComponent={({value}) => <div className={classes.input}>{value}</div>}
            endAdornment={<InputAdornment position='end'>
              <IconButton onMouseDown={(event) => event.preventDefault()}>
                {endIcon ? endIcon : <AccessTime />}
              </IconButton>
            </InputAdornment>}
            {...inputProps} />
          {error && <FormHelperText error {...formHelperTextProps}>{error}</FormHelperText>}
        </FormControl>
      </div>,
      dialog ?
        <Dialog key='date-dialog' open={clockShow} onClose={this.closeClock}>
          <Clock
            ref={(clock: any) => this.clock = ReactDOM.findDOMNode(clock)}
            value={value} onChange={onChange} selectableMinutesInterval={selectableMinutesInterval}
            closeClock={this.closeClock} okToConfirm={okToConfirm} {...clockProps} />
        </Dialog> :
        <Popover key='date-popover' open={clockShow}
          onEntered={() => {
            if(this.action.resize) {
              this.action.resize();
            }
          }}
          anchorOrigin={anchorOrigin} transformOrigin={transformOrigin} anchorEl={this.input as any}>
          <Clock
            action={(action) => this.action.resize = action.resize}
            ref={(clock: any) => this.clock = ReactDOM.findDOMNode(clock)}
            value={value} onChange={onChange} selectableMinutesInterval={selectableMinutesInterval}
            closeClock={this.closeClock} okToConfirm={okToConfirm} {...clockProps} />
        </Popover>
    ]);
  }
}

export const TimeFormatInput = withStyles(styles)(TimeFormatInputBase);
export default TimeFormatInput;
