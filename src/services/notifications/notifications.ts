import { compose, curry, tap } from 'ramda';

// Type definitions
export interface Action {
  message: string;
  type: string;
}
export type DispatchAction = (action: Action) => void;
export type NotificationType = 'error' | 'info' | 'success' | 'warning';

// The mock dispatch
export const dispatch: DispatchAction = action => {
  console.log('Dispatching:', action);
};

// Curried function to create an action
export const createAction = curry((type: NotificationType, message: string): Action => {
  return {
    message,
    type: `NOTIFY_${type.toUpperCase()}`
  };
});

// Curried function to dispatch a notification action
export const dispatchNotification = curry((dispatch: DispatchAction, action: Action): void => {
  return dispatch(action);
});

// Curried logger function
export const logNotification = curry((origin: string, type: NotificationType, message: string): void => {
  console.log(`${origin} | [${type.toUpperCase()}] ${message}`);
});

// Composed function to notify and dispatch
export const notifyUser = curry((dispatch: DispatchAction, type: NotificationType, message: string) => {
  return compose(dispatchNotification(dispatch), createAction(type), tap(logNotification(`NotificationSvc-${type}`, type)))(message);
});

// Preconfigured notification handlers
export const notify = notifyUser(dispatch);

export const error = notify('error');
export const info = notify('info');
export const success = notify('success');
export const warning = notify('warning');
