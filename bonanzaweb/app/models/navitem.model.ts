export class NavigationItem {
    
    constructor(public Label: string, 
    public Path: string, 
    public Icon: string,
    public Count: number,
    public IsAvailable: boolean,
    public IsSelected: boolean){}
}