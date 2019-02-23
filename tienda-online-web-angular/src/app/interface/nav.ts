export interface Nav {
    title: string;
    url: string;
    text: string;
    subnav?: Nav[];
}