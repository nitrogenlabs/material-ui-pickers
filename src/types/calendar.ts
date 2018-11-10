import {StyledComponentProps} from '@material-ui/core/styles';

export interface CalendarProps extends React.Props<{}>, StyledComponentProps {
  readonly action: (actions: any) => void;
  readonly value: Date;
  readonly onChange: (value: Date, event?: React.MouseEvent<HTMLElement>) => void;
  readonly closeCalendar: () => void;
  readonly dateDisabled?: (date: Date) => boolean;
  readonly min?: Date;
  readonly max?: Date;
  readonly okToConfirm?: boolean;
  readonly classes?: {
    root?: string
    selectedDay?: string
    selectedDayText?: string
    selectedYear?: string
    selectedYearText?: string
  };
}

export interface CalendarState {
  readonly mode: 'year' | 'month';
  readonly buttonHeight: number;
  readonly selected: Date;
  readonly month: number;
  readonly year: number;
  readonly yearIndex: number;
}
