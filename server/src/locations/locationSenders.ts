import { LocationObject } from "./locationTypes";

class LocationSenders {
  usersMap = new Map<string, LocationObject>();
  changedLocationsMap = new Map<string, boolean>();

  ifLocationChanged = (user: string, location: LocationObject) => {
    if (this.usersMap.has(user)) {
      const oldLocation = this.usersMap.get(user);
      return JSON.stringify(oldLocation) !== JSON.stringify(location);
    }
    return true;
  };

  changeLocation = (user: string, location: LocationObject) => {
    if (this.ifLocationChanged(user, location)) {
      this.usersMap.set(user, location);
      this.setChanged(user, true);
    }
  };

  setChanged = (user: string, changed: boolean) => {
    this.changedLocationsMap.set(user, changed);
  };

  getChanges = () => {
    return Array.from(this.changedLocationsMap).reduce((changes, [user, change]) => {
        if(change){return [...changes, user]}
        return changes
    }, [] as string[]);
  };

  getLocation = (user: string)=>{
      return this.usersMap.get(user)
  }

  removeLocation = (user: string)=>{
      this.changedLocationsMap.delete(user);
      this.usersMap.delete(user);
  }
}

export const locationSenders = new LocationSenders();
