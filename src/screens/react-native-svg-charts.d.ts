declare module 'react-native-svg-charts' {
    import { ReactElement } from 'react';
    import { ViewStyle } from 'react-native';
    import { PathProps, SvgProps } from 'react-native-svg';
  
    export interface ChartData {
      key: number;
      amount: number;
      svg?: Partial<PathProps>;
      label?: string;
    }
  
    export interface PieChartProps {
      data: ChartData[];
      innerRadius?: number;
      outerRadius?: number;
      padAngle?: number;
      style?: ViewStyle;
    }
  
    export class PieChart extends React.Component<PieChartProps> {}
  
    export interface GridProps {
      belowChart?: boolean;
      svg?: Partial<SvgProps>;
    }
  
    export class Grid extends React.Component<GridProps> {}
  }
  