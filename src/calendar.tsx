import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {StyleRules, Theme, withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import * as classnames from 'classnames';
import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {virtualize} from 'react-swipeable-views-utils';

import * as DateUtil from './date';
import {CalendarProps, CalendarState} from './types/calendar';

const VirtualizedSwipeableViews = virtualize(SwipeableViews);

const styles = (theme: Theme): StyleRules => ({
  calendarContainer: {
    maxWidth: '100%',
    overflow: 'hidden',
    position: 'relative',
    width: `${(48 * 7).toString()}px`
  },
  calendarControl: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    zIndex: 100
  },
  calendarControlButton: {
    pointerEvents: 'all'
  },
  calendarControlMonth: {
    alignItems: 'center',
    display: 'flex',
    height: '48px',
    justifyContent: 'center'
  },
  calendarMonthTitle: {
    fontSize: '1rem',
    fontWeight: 500,
    textTransform: 'none'
  },
  invalidInput: {
    color: theme.palette.text.disabled
  },
  labelWeekDay: {
    color: theme.palette.text.hint,
    fontWeight: 300,
    height: '48px',
    lineHeight: '48px',
    textAlign: 'center',
    width: '48px'
  },
  okToConfirmRow: {
    alignItems: 'center',
    display: 'flex',
    height: '48px',
    justifyContent: 'flex-end',
    padding: '0 6px'
  },
  selectedDay: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    },
    backgroundColor: theme.palette.primary.dark
  },
  selectedDayText: {
    color: theme.palette.primary.contrastText
  },
  week: {
    display: 'flex'
  },
  weekDay: {
    flex: '1 1 auto',
    margin: '5px',
    width: '38px'
  },
  weekDayResponse: {
    maxHeight: 'calc(((100vw - 64px) / 7) - 10px)'
  },
  years: {
    alignItems: 'center',
    display: 'flex',
    height: '48px',
    justifyContent: 'space-around'
  }
});

export class CalendarBase extends React.Component<CalendarProps, CalendarState> {
  container: Element;
  updateHeight = {
    month: undefined as () => void,
    year: undefined as () => void
  };

  constructor(props) {
    super(props);

    const now: Date = new Date();
    let date: Date = new Date(now.getTime());
    const {min, max, value} = props;

    if(max && now.getTime() > max.getTime()) {
      date = new Date(max.getTime());
    } else if(min && now.getTime() < min.getTime()) {
      date = new Date(min.getTime());
    }

    if(props.action) {
      props.action({resize: this.resize});
    }

    this.state = {
      buttonHeight: this.getButtonHeight(),
      mode: 'month',
      month: value ? value.getMonth() : date.getMonth(),
      selected: props.value,
      year: value ? value.getFullYear() : date.getFullYear(),
      yearIndex: Math.floor(date.getFullYear() / 18)
    };
  }

  componentDidMount() {
    if(!this.props.action) {
      this.resize();
    }

    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  getButtonHeight = () => {
    const view = this.container ? this.container.getBoundingClientRect().width : 336;
    return view / 7;
  }

  resize = () => {
    if(this.updateHeight.month) {
      this.setState({buttonHeight: this.getButtonHeight()}, this.updateHeight.month);
    }
    if(this.updateHeight.year) {
      this.setState({buttonHeight: this.getButtonHeight()}, this.updateHeight.year);
    }
  }

  selectDate = (date: Date, event: React.MouseEvent<HTMLElement>) => {
    const {onChange, closeCalendar, okToConfirm} = this.props;

    if(okToConfirm) {
      this.setState({selected: date});
    } else {
      closeCalendar()
      onChange(date, event);
    }
  }

  confirmDate = (event: React.MouseEvent<HTMLElement>) => {
    const {onChange, closeCalendar, okToConfirm} = this.props;

    if(okToConfirm) {
      closeCalendar()
      onChange(this.state.selected, event);
    }
  }

  showYearsCalendar = () => {
    const {year} = this.state;

    this.setState({
      mode: 'year',
      yearIndex: Math.floor(year / 18)
    });
  }

  selectCalendarYear = (year?: number) => {
    const {min, max} = this.props;
    const {month} = this.state;

    if(year) {
      this.setState({
        mode: 'month',
        year,
        month: min && month < min.getMonth() && year === min.getFullYear() ? min.getMonth() : (
          max && month > max.getMonth() && year === max.getFullYear() ? max.getMonth() : month
        )
      });
    } else {
      this.setState({mode: 'month'});
    }
  }

  previousYearsValid = () => {
    const {min} = this.props;
    const {yearIndex} = this.state;
    return yearIndex >= 1 && (min === undefined || yearIndex >= Math.ceil(min.getFullYear() / 18));
  }

  previousYears = () => {
    const {min} = this.props;
    const {yearIndex} = this.state;

    this.setState({yearIndex: yearIndex - 1});
  }

  nextYearsValid = () => {
    const {max} = this.props;
    const {yearIndex} = this.state;
    return max === undefined || yearIndex < Math.floor(max.getFullYear() / 18);
  }

  nextYears = () => {
    const {yearIndex} = this.state;

    this.setState({yearIndex: yearIndex + 1});
  }

  changeYears = (index) => {
    this.setState({yearIndex: index});
  }

  yearInvalid = (currentYear: number) => {
    const {min, max} = this.props;
    const {month, year} = this.state;
    return (min && currentYear < min.getFullYear()) || (max && currentYear > max.getFullYear()) || year === currentYear;
  }

  previousMonthValid = () => {
    const {min} = this.props;
    const {month, year} = this.state;
    return min === undefined || (month > min.getMonth() || year > min.getFullYear());
  }

  previousMonth = () => {
    const {month, year} = this.state;
    this.setState({year: year - (month <= 0 ? 1 : 0), month: month <= 0 ? 11 : month - 1});
  }

  nextMonthValid = () => {
    const {max} = this.props;
    const {month, year} = this.state;
    return max === undefined || (month < max.getMonth() || year < max.getFullYear());
  }

  nextMonth = () => {
    const {month, year} = this.state
    this.setState({
      year: year + (month >= 11 ? 1 : 0),
      month: month >= 11 ? 0 : month + 1
    })
  }

  changeMonth = (index) => {
    this.setState({
      year: Math.floor(index / 12),
      month: index % 12
    })
  }

  dayInvalid = (date: Date) => {
    const {value, min, max} = this.props
    return (value && DateUtil.sameDay(date, value))
      || (min && date.getTime() < min.setHours(0, 0, 0, 0)
        || (max && date.getTime() > max.setHours(0, 0, 0, 0)))
  }

  yearIndexValid = (index: number) => {
    const {yearIndex} = this.state;
    return index <= yearIndex + 2 && index >= yearIndex - 2;
  }

  monthIndexValid = (index: number) => {
    const {month, year} = this.state;
    const currentIndex = year * 12 + month;
    return index <= currentIndex + 2 && index >= currentIndex - 2;
  }

  generateYearCalendar = (index: number) => {
    const years: number[][] = [];
    let counter: number = 0;

    for(let year = index * 18; year < (index + 1) * 18; year++) {
      if(!years[Math.floor(counter / 3)]) {
        years[Math.floor(counter / 3)] = [year];
      } else {
        years[Math.floor(counter / 3)] = [...years[Math.floor(counter / 3)], year];
      }

      counter++;
    }

    return years;
  }

  generateMonthCalendar = (index: number) => {
    const calendarFocus = {year: Math.floor(index / 12), month: index % 12};
    const firstDay = new Date(calendarFocus.year, calendarFocus.month, 1);
    const daysInWeekInMonth: Date[][] = [Array(firstDay.getDay()).fill(undefined)];
    let counter: number = firstDay.getDay();

    for(
      let day = firstDay;
      day.getMonth() === calendarFocus.month;
      day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
    ) {
      if(!daysInWeekInMonth[Math.floor(counter / 7)]) {
        daysInWeekInMonth[Math.floor(counter / 7)] = [new Date(day.getFullYear(), day.getMonth(), day.getDate())];
      } else {
        daysInWeekInMonth[Math.floor(counter / 7)] = [
          ...daysInWeekInMonth[Math.floor(counter / 7)],
          new Date(day.getFullYear(), day.getMonth(), day.getDate())
        ];
      }
      counter++;
    }

    for(let day: number = 6; !daysInWeekInMonth[daysInWeekInMonth.length - 1][day]; day--) {
      daysInWeekInMonth[daysInWeekInMonth.length - 1][day] = undefined;
    }

    return daysInWeekInMonth;
  }

  renderModeMonth(): JSX.Element[] {
    const {classes, value, closeCalendar, dateDisabled, okToConfirm} = this.props;
    const {buttonHeight, selected, year, month} = this.state;
    const active = okToConfirm ? selected : value;

    return [
      <div className={(classes as any).calendarControl} key='calendar-month-control'>
        <IconButton
          classes={{root: (classes as any).calendarControlButton}}
          disabled={!this.previousMonthValid()}
          onClick={this.previousMonth}>
          <ChevronLeft />
        </IconButton>
        <IconButton
          classes={{root: (classes as any).calendarControlButton}}
          disabled={!this.nextMonthValid()}
          onClick={this.nextMonth}>
          <ChevronRight />
        </IconButton>
      </div>,
      <VirtualizedSwipeableViews key='calendar-month-swipeable'
        action={(actions) => this.updateHeight.year = actions.updateHeight}
        className={(classes as any).calendarContainer}
        index={(year * 12) + month} animateHeight onChangeIndex={this.changeMonth}
        slideRenderer={({index}) =>
          (this.monthIndexValid(index) ?
            <div key={index} className={(classes as any).calendarContainer}>
              <div className={(classes as any).calendarControlMonth}>
                <Button onClick={this.showYearsCalendar} classes={{root: (classes as any).calendarMonthTitle}}>
                  {`${DateUtil.month[index % 12].long}, ${Math.floor(index / 12)}`}
                </Button>
              </div>
              <div className={(classes as any).week}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) =>
                  (<Typography key={`weeklabel-${index}`} className={(classes as any).labelWeekDay} variant='body1'
                    style={{height: buttonHeight, lineHeight: `${buttonHeight}px`}}
                  >{day}</Typography>)
                )}
              </div>
              {this.generateMonthCalendar(index).map((week, index) =>
                (<div className={(classes as any).week} key={`week-${index}`}>
                  {week.map((date, index) =>
                    (date ? <IconButton
                      classes={{
                        root: classnames({
                          [classes.selectedDay]: active && DateUtil.sameDay(date, active)
                        }, (classes as any).weekDay)
                      }}
                      disabled={this.dayInvalid(date) || (dateDisabled && dateDisabled(date))}
                      onClick={(event) => this.selectDate(date, event)} key={`day-${index}`}
                      style={{height: buttonHeight - 10}}>
                      <Typography
                        classes={{
                          root: classnames({
                            [classes.selectedDayText]: active && DateUtil.sameDay(date, active),
                            [(classes as any).invalidInput]: this.dayInvalid(date)
                              || (dateDisabled && dateDisabled(date))
                          })
                        }}
                        variant='body1'
                        style={{height: buttonHeight - 10, lineHeight: `${buttonHeight - 10}px`}}>
                        {date.getDate()}
                      </Typography>
                    </IconButton> :
                      <div className={(classes as any).weekDay} style={{height: buttonHeight - 10}} key={`day-${index}`} />)
                  )}
                </div>)
              )}
            </div> :
            <div key={index} />)
        } />,
      okToConfirm && <div className={(classes as any).okToConfirmRow} key='calendar-confirm-button'>
        <Button onClick={closeCalendar}>CANCEL</Button>
        <Button onClick={(event) => this.confirmDate(event)}>OK</Button>
      </div>
    ];
  }

  renderModeYear(): JSX.Element[] {
    const {classes} = this.props;
    const {year, yearIndex} = this.state;

    return [
      <div className={(classes as any).calendarControl} key='calendar-year-control'>
        <IconButton
          classes={{root: (classes as any).calendarControlButton}}
          disabled={!this.previousYearsValid()}
          onClick={this.previousYears}>
          <ChevronLeft />
        </IconButton>
        <IconButton
          classes={{root: (classes as any).calendarControlButton}}
          disabled={!this.nextYearsValid()}
          onClick={this.nextYears}>
          <ChevronRight />
        </IconButton>
      </div>,
      <VirtualizedSwipeableViews key='calendar-year-swipeable'
        action={(actions) => this.updateHeight.year = actions.updateHeight}
        className={(classes as any).calendarContainer}
        index={yearIndex} animateHeight onChangeIndex={this.changeYears}
        slideRenderer={({index}) =>
          (this.yearIndexValid(index) ?
            <div key={index}>
              <div className={(classes as any).calendarControlMonth}>
                <Button onClick={() => this.selectCalendarYear()} classes={{root: (classes as any).calendarMonthTitle}}>
                  {`${index * 18} - ${(index * 18) + 17}`}
                </Button>
              </div>
              <div className={(classes as any).calendarContainer}>
                {this.generateYearCalendar(index).map((years, index) =>
                  (<div className={(classes as any).years} key={`years-${index}`}>
                    {years.map((currentYear, index) =>
                      (<Button
                        className={classnames({[classes.selectedYear]: year === currentYear})}
                        variant={year === currentYear ? 'raised' : 'flat'}
                        disabled={this.yearInvalid(currentYear)}
                        onClick={() => this.selectCalendarYear(currentYear)} key={`year-${index}`}
                      >
                        <Typography className={classnames({
                          [(classes as any).invalidInput]: this.yearInvalid(currentYear),
                          [classes.selectedYearText]: year === currentYear
                        })} variant='body1'
                        >
                          {currentYear}
                        </Typography>
                      </Button>)
                    )}
                  </div>)
                )}
              </div>
            </div> :
            <div key={index} />)
        }
      />
    ];
  }

  renderMode(mode: string): JSX.Element[] {
    switch(mode) {
      case 'month':
        return this.renderModeMonth();
      case 'year':
        return this.renderModeYear();
      default:
        return [];
    }
  }

  render(): JSX.Element {
    const {classes} = this.props;
    const {mode} = this.state;

    return (<div ref={(container) => this.container = container} className={classes.root}>
      {this.renderMode(mode)}
    </div>);
  }
}

export const Calendar = withStyles(styles)(CalendarBase);
export default Calendar;
