import { ApplicationUser, NotificationModel } from ".";

export interface IState {
  Notifications: NotificationModel[];
  ApplicationUser: ApplicationUser;
}

export let DefaultState: IState = {
  Notifications: [],
  ApplicationUser: {},
};
