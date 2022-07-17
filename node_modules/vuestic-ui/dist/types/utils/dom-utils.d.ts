export declare const clickedRootScrollbar: (event: MouseEvent) => boolean;
export declare const ownerDocument: (node?: Element | undefined) => Document;
export declare const isLeftClickEvent: (event: MouseEvent) => boolean;
export declare const isModifiedEvent: (event: MouseEvent) => boolean;
export declare const contains: (context: Element, node: Element) => boolean;
declare type ListenOptions<K> = {
    node: HTMLElement | Document | Window;
    eventName: K extends keyof HTMLElementEventMap ? K : never;
    handler: EventListenerOrEventListenerObject;
    options?: boolean | AddEventListenerOptions;
};
export declare const listen: ({ node, eventName, handler, options, }: ListenOptions<keyof HTMLElementEventMap>) => () => void;
export {};
