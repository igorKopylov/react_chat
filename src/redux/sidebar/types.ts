import { Profile } from "../chat/types";

export default interface SidebarSliceState {
    users: Profile[],
    isModal: boolean
}