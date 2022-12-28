export const MENU = [ "Todos", "Notes", "Mail", "Templates" ] as const;
export type tServiceMenu = typeof MENU[number];
