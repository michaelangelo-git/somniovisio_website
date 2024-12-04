import { animate, animation, keyframes, style } from "@angular/animations";

export const textAnimation = animation([
    style({ opacity: 0, transform: 'translateX(-200px)' }),
    animate('.1s linear', keyframes([
        style({ opacity: 0, transform: 'translateX(-200px)' }),
        style({ opacity: .5, transform: 'translateX(10px)' }),
        style({ opacity: 1, transform: 'translateX(-5px)' }),
        style({ opacity: 1, transform: 'translateX(0px)' }),
    ]))
]);

export const pageExit = animation([
    animate('1s ease-in', keyframes([
        style({ transform: 'scale(1) translateX(0%)' }),
        style({ transform: 'scale(.95)' }),
        style({ transform: 'translateX(-100%)' }),
        style({ display: 'none' })
    ]))
]);

export const lensAnimation = animation([
    style({ opacity: 0, overflow: 'visible', width: 'auto', gap: '300px' }),
    animate('1.5s .8s ease-in-out', keyframes([
        style({ opacity: 0, overflow: 'visible', width: 'auto', gap: '300px' }),
        style({ opacity: 1, overflow: 'visible', width: 'auto', gap: '0px' }),
    ]))
]);

export const bounceCharacters = animation([
    animate('.2s linear', keyframes([
        style({ opacity: 1, transform: 'translateY(0px)' }),
        style({ opacity: 1, transform: 'translateY(15px)' }),
        style({ opacity: 1, transform: 'translateY(0px)' }),
    ]))
]);