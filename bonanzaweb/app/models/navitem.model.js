"use strict";
var NavigationItem = (function () {
    function NavigationItem(Label, Path, Icon, Count, IsAvailable, IsSelected) {
        this.Label = Label;
        this.Path = Path;
        this.Icon = Icon;
        this.Count = Count;
        this.IsAvailable = IsAvailable;
        this.IsSelected = IsSelected;
    }
    return NavigationItem;
}());
exports.NavigationItem = NavigationItem;
//# sourceMappingURL=navitem.model.js.map