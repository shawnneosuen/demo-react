import mitt from "mitt";

type EventsGlobal = {
    EditEditDraw:{
        id: string,
        open: boolean,
        title?: string,
        data?: any
    }


}

export type Events = EventsGlobal;

/**
 * 事件总线
 */
export const emitter = mitt<Events>();
