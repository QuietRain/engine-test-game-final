namespace dessert {

    export type Ticker_Listener_Type = (deltaTime: number) => void;

    export class Ticker {

        private static instance: Ticker;
		/**
		 * 得到Ticker（全局只有一个）
		 */
        static getInstance() {
            if (!Ticker.instance) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        }

        listeners: Ticker_Listener_Type[] = [];

        register(listener: Ticker_Listener_Type) {
            this.listeners.push(listener);
        }

        unregister(listener: Ticker_Listener_Type) {
            var copyListeners = this.listeners;
            for (let currnetListener of this.listeners) {
                if (currnetListener == listener) {
                    var listenerIndex = this.listeners.indexOf(currnetListener);
                    copyListeners.splice(listenerIndex, 1);
                    break;
                }
            }
            this.listeners = copyListeners;
        }

        notify(deltaTime: number) {
            for (let listener of this.listeners) {
                listener(deltaTime);
            }
        }

    }

}