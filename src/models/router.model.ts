import type { Location, Navigator } from '@solidjs/router/dist/types';

export class RouterService {
  private _location?: Location;
  private _navigator?: Navigator;

  setLocation(location: Location) {
    this._location = location;
  }

  setNavigate(navigator: Navigator) {
    this._navigator = navigator;
  }

  get navigate(): Navigator {
    if (!this._navigator) throw new Error('Navigation failed. Router is not initialized.');
    return this._navigator;
  }

  get location(): Location {
    if (!this._location) throw new Error('Location access failed. Router is not initialized.');
    return this._location;
  }
}
