export type StackParamList = {
Login: undefined;
Welcome: { email: string };
Menu:undefined;
Details:{itemId:string};
RemoteMenu: undefined;

};
export type TabParamList = {
Login: undefined;
Welcome: { email?: string } | undefined;
};
export type DrawerParamList = {
Login: undefined;
Welcome: { email?: string } | undefined;
};