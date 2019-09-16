import bothSVG from "../../assets/icons/both.svg";
import {getEventName} from "../util/getEventName";
import {MenuItem} from "./MenuItem";

export class Both extends MenuItem {
    constructor(vditor: IVditor, menuItem: IMenuItem) {
        super(vditor, menuItem);
        const hasWYSIWYG = vditor.options.toolbar.find((item: IMenuItem) => {
            if (item.name === "wysiwyg") {
                return true;
            }
        });
        if (vditor.currentMode === 'wysiwyg' && hasWYSIWYG) {
            this.element.style.display = "none";
        }
        this.element.children[0].innerHTML = menuItem.icon || bothSVG;
        if (vditor.options.preview.mode === "both") {
            this.element.children[0].className =
                `vditor-tooltipped vditor-tooltipped__${menuItem.tipPosition} vditor-menu--current`;
        }
        this._bindEvent(vditor, menuItem);
    }

    public _bindEvent(vditor: IVditor, menuItem: IMenuItem) {
        this.element.children[0].addEventListener(getEventName(), function () {
            const vditorElement = document.getElementById(vditor.id);
            let className;
            if (vditor.preview.element.className === "vditor-preview vditor-preview--both") {
                vditor.preview.element.className = "vditor-preview vditor-preview--editor";
                className = `vditor-tooltipped vditor-tooltipped__${menuItem.tipPosition}`;
            } else {
                vditor.preview.element.className = "vditor-preview vditor-preview--both";
                className = `vditor-tooltipped vditor-tooltipped__${menuItem.tipPosition} vditor-menu--current`;
                vditor.preview.render(vditor);
            }
            if (vditorElement.className.indexOf("vditor--fullscreen") > -1) {
                className = className.replace("__n", "__s");
            }
            this.className = className;

            if (vditor.toolbar.elements.preview &&
                vditor.toolbar.elements.preview.children[0].className.indexOf("vditor-menu--current") > -1) {
                vditor.toolbar.elements.preview.children[0].className =
                    vditor.toolbar.elements.preview.children[0].className.replace(" vditor-menu--current", "");
            }
        });
    }
}
