import { AnimationMetadata } from "@angular/animations";
import { BehaviorSubject } from "rxjs";
export type Bar = {
    name: string,
    header?: string,
    content?: string,
    width?: 0 | number,
    height?: 0 | number
    styles?: Object
    animation?: AnimationMetadata
}

export class BarBuilder {
    public barElements: Bar[] = [];
    
    public get length() : number { return this.barElements.length}
    public get totalHeight() : number { return this.barElements.length * this.barElements[0].width }

    public setBars(numBars?: number) {
        if (numBars) {
            for (let i = 0; i < numBars; ++i) {
                this.barElements.push({ name: `bar _${i}` });
            }
        } else {
            for (let i = 0; i < 10; ++i) {
                this.barElements.push({ name: `bar _${i}` });
            }
        }
    }
    public getBars() : Bar[] { return this.barElements}
    
    constructor(private numberBars?: number, barStyle?: CSSStyleRule[]) {}
}

export class ElementTrigger {

    public static triggerList: ElementTrigger[] = [];
    public static get getTriggerElements(): ElementTrigger[] { return this.triggerList }

    public static updateTriggerList(newTrigger: ElementTrigger){
        
        let triggerIndex = this.triggerList.findIndex(elementTrigger => elementTrigger.classname == newTrigger.classname);
        if(this.triggerList){
            if(triggerIndex >= 0){
                if(this.triggerList[triggerIndex].isTriggered != newTrigger.isTriggered)
                this.triggerList[triggerIndex] = newTrigger;
            } else {
                this.triggerList.push(newTrigger);
            }
           
        } else {
            this.triggerList.push(newTrigger);
        }
    }

    public isTriggered: boolean;
    public className: string;
    public bounds: DOMRect;
    
    constructor(el: HTMLElement, isTriggeredIn: boolean){
        this.bounds = el.getBoundingClientRect();
        this.className = el.className;
        this.isTriggered = isTriggeredIn;
    }

    public get triggered() { return this.isTriggered }
    public set triggered(valueIn: boolean) { this.isTriggered = valueIn}

    public get classname() { return this.className; }
    public set classname(classnameIn: string) { this.className = classnameIn}

    public get clientBounds() { return this.bounds}
    public set clientBounds(clientBoundsIn: DOMRect) { this.bounds = clientBoundsIn }
}


