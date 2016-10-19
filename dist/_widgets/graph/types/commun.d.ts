export interface DataGraph {
    label: string;
    value: number;
}
export interface SingleData {
    value: number;
    min_value: number;
    max_value: number;
}
export interface Color {
    r: number;
    g: number;
    b: number;
}
export interface ColorsForScale {
    start_color: Color;
    end_color?: Color;
    nb_color?: number;
}
export interface SimpleColor {
    color: Color;
    hover_color: Color;
}
export interface Graph {
    datas: DataGraph[] | SingleData;
    colors?: ColorsForScale | SimpleColor;
    width?: number;
    height?: number;
    id: string;
    required_files: string[];
    loadGraph(): void;
}
