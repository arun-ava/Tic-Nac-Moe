// TODO: Should registration be handled in ngrx? their is no direct related state to it

import { createAction } from "@ngrx/store";

export const registerUserActionCreator = createAction(
    '[AWS] Register User'
);

export const successfulUserRegistrationActionCreator = createAction(
    '[AWS] User Registration Successful'
);

export const failedUserRegistrationActionCreator = createAction(
    '[AWS] User Registration Unsuccessful'
);