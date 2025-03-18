import {
  createAction,
  dispatch,
  dispatchNotification,
  error,
  info,
  logNotification,
  notify,
  notifyUser,
  success,
  warning,
  DispatchAction,
  NotificationType
} from './notifications';

describe('Notification Service', () => {
  const log = console.log;

  beforeEach(() => {
    console.log = jest.fn();
  });

  afterEach(() => {
    console.log = log;
  });

  test('createAction should return an action', () => {
    const action = createAction('info', 'Test message');
    expect(action).toEqual({ message: 'Test message', type: 'NOTIFY_INFO' });
  });

  test('dispatchNotification should dispatch the correct action', () => {
    const action = createAction('error', 'Test message');
    const notifyError = dispatchNotification(dispatch);
    notifyError(action);

    expect(console.log).toHaveBeenCalledWith('Dispatching:', {
      message: 'Test message',
      type: 'NOTIFY_ERROR'
    });
  });

  test('logNotification should log the correct message', () => {
    const logFn = logNotification('NotificationSvc', 'info');
    logFn('Test log message');

    expect(console.log).toHaveBeenCalledWith('NotificationSvc | [INFO] Test log message');
  });

  test('notifyUser should dispatch and log the message', () => {
    const notifyFn = notifyUser(dispatch);
    const notifyInfo = notifyFn('info');
    notifyInfo('User notification');

    expect(console.log).toHaveBeenCalledWith('Dispatching:', {
      message: 'User notification',
      type: 'NOTIFY_INFO'
    });
  });

  test('notifyUser should log the correct message', () => {
    const notifyFn = notifyUser(dispatch);
    const notifyWarning = notifyFn('warning');
    notifyWarning('Warning issued');

    expect(console.log).toHaveBeenLastCalledWith('Dispatching:', {
      message: 'Warning issued',
      type: 'NOTIFY_WARNING'
    });
  });

  test('notify() should dispatch and log an error', () => {
    notify('error')('Error occurred');

    expect(console.log).toHaveBeenLastCalledWith('Dispatching:', {
      message: 'Error occurred',
      type: 'NOTIFY_ERROR'
    });
  });

  test('error() should dispatch and log an error message', () => {
    error('An error occurred');

    expect(console.log).toHaveBeenLastCalledWith('Dispatching:', {
      message: 'An error occurred',
      type: 'NOTIFY_ERROR'
    });
  });

  test('info() should dispatch and log an info message', () => {
    info('Information available');

    expect(console.log).toHaveBeenLastCalledWith('Dispatching:', {
      message: 'Information available',
      type: 'NOTIFY_INFO'
    });
  });

  test('success() should dispatch and log a success message', () => {
    success('Operation successful');

    expect(console.log).toHaveBeenLastCalledWith('Dispatching:', {
      message: 'Operation successful',
      type: 'NOTIFY_SUCCESS'
    });
  });

  test('warning() should dispatch and log a warning message', () => {
    warning('Caution is advised');

    expect(console.log).toHaveBeenLastCalledWith('Dispatching:', {
      message: 'Caution is advised',
      type: 'NOTIFY_WARNING'
    });
  });
});
