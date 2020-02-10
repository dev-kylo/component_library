export interface ITab{
    name: string,
    select: () => void,
    unselect: () =>  void
}

export interface ITabContentData extends ITab {};

export interface ITabHeaderData extends ITab {
    id: string
}

export interface ITabGroup {
    header: ITabHeaderData,
    content: ITabContentData
}
  